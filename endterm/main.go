package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Post struct {
	ID             string    `json:"id"`
	Title          string    `json:"title"`
	Text           string    `json:"text"`
	DateOfCreation time.Time `json:"dateOfCreation"`
	Author         string    `json:"author"`
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var posts = []Post{{ID: "1", Title: "First", Text: "About First", DateOfCreation: time.Now(), Author: "First name"}}
var secretKey = []byte("your-secret-key")

func main() {
	router := gin.New()

	router.POST("/login", Login)
	postsRouter := router.Group("/posts", AuthMiddleware)
	{
		postsRouter.GET("", GetPosts)
		postsRouter.GET("/:id", GetPost)
		postsRouter.POST("", CreatePost)
		postsRouter.PUT("/:id", UpdatePost)
		postsRouter.DELETE("/:id", DeletePost)
	}

	http.ListenAndServe(":8080", router)
}

func Login(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if user.Username == "admin" && user.Password == "password" {
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["username"] = user.Username
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

		tokenString, err := token.SignedString(secretKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.String(http.StatusOK, tokenString)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
	}
}

func AuthMiddleware(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing authorization token"})
		c.Abort()
		return
	}

	token, err := jwt.Parse(tokenString[7:], func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization token"})
		c.Abort()
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || claims["username"] == nil || claims["username"].(string) != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient privileges"})
		c.Abort()
		return
	}

	c.Next()
}

func GetPosts(c *gin.Context) {
	c.JSON(http.StatusOK, posts)
}

func GetPost(c *gin.Context) {
	id := c.Param("id")
	for _, post := range posts {
		if post.ID == id {
			c.JSON(http.StatusOK, post)
			return
		}
	}
	c.JSON(http.StatusNotFound, nil)
}

func CreatePost(c *gin.Context) {
	var post Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post.ID = fmt.Sprintf("%d", len(posts)+1)
	post.DateOfCreation = time.Now()
	posts = append(posts, post)
	c.JSON(http.StatusCreated, post)
}

func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	for i, post := range posts {
		if post.ID == id {
			var updatedPost Post
			if err := c.ShouldBindJSON(&updatedPost); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			updatedPost.ID = post.ID
			updatedPost.DateOfCreation = post.DateOfCreation
			posts[i] = updatedPost
			c.JSON(http.StatusOK, updatedPost)
			return
		}
	}
	c.JSON(http.StatusNotFound, nil)
}

func DeletePost(c *gin.Context) {
	id := c.Param("id")
	for i, post := range posts {
		if post.ID == id {
			posts = append(posts[:i], posts[i+1:]...)
			c.JSON(http.StatusOK, post)
			return
		}
	}
	c.JSON(http.StatusNotFound, nil)
}
