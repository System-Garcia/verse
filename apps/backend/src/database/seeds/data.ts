export const seedData = {
    users: [
      {
        name: "john Doe",
        email: "john.doe@example.com",
        password: "12345678",
        isActive: true
      },
      {
        name: "jane Smith",
        email: "jane.smith@example.com",
        password: "12345678",
        isActive: true
      }
    ],
    roles: [
      {
        name: "admin",
        description: "administrator with elevated permissions to manage and oversee the application, including user management, system configuration, maintaining data integrity, and accessing advanced features for security and efficiency"
      },
      {
        name: "user",
        description: "regular user with access to basic features and functionalities of the application, including viewing and managing their own data, accessing public content, and utilizing general application features"
      }
    ],
    user_roles: [
      {
        user_id: 1,
        role_id: 1
      },
      {
        user_id: 1,
        role_id: 2
      },
      {
        user_id: 2,
        role_id: 2
      }
    ],
    favorite_books: [
      {
        user_id: 1,
        book_id: "zyTCAlFPjgYC",
        title: "The Google Story",
        author: "David A. Vise",
        thumbnail: "http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      }
    ],
    reading_history: [
      {
        user_id: 1,
        book_id: "zyTCAlFPjgYC",
        title: "The Google Story",
        author: "David A. Vise",
        read_date: "2022-01-01"
      }
    ],
    user_preferences: [
      {
        user_id: 1,
        preferences_key: "theme",
        preferences_value: "history"
      },
      {
        user_id: 1,
        preferences_key: "author",
        preferences_value: "Stephen King"
      },
      {
        user_id: 1,
        preferences_key: "gender",
        preferences_value: "horror"
    },
    {
        user_id: 2,
        preferences_key: "theme",
        preferences_value: "psychology"
      },
      {
        user_id: 2,
        preferences_key: "author",
        preferences_value: "Agatha Christie"
      },
      {
        user_id: 2,
        preferences_key: "gender",
        preferences_value: "mystery"}
    ]
  };
  