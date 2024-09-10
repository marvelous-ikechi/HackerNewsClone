import {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

// Enable promise-based SQLite operations
SQLite.enablePromise(true);

// Open the database
const openDatabase = async () => {
  return await SQLite.openDatabase({
    name: 'auth.db',
    location: 'default',
  });
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create users table if it doesn't exist
  const initDb = async () => {
    const db = await openDatabase();
    await db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT,
          lastName TEXT,
          email TEXT UNIQUE,
          password TEXT
        )`,
      );
    });
  };

  // Sign Up function
  const signup = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        const db = await openDatabase();

        // Insert user into the database
        await db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, password],
            (_, result) => {
              if (result.rowsAffected > 0) {
                // User inserted successfully
                resolve({
                  success: true,
                  user: {firstName, lastName, email},
                });
              } else {
                // Insertion failed for some reason
                resolve({
                  success: false,
                  error: 'Failed to create user.',
                });
              }
            },
            _ => {
              // Handle a case where email already exists or any other error
              resolve({
                success: false,
                error: 'Email already exists.',
              });
              return true; // Abort the transaction
            },
          );
        });
      } catch (_) {
        reject(new Error('Error creating user'));
      } finally {
        setIsLoading(false);
      }
    });
  };

  // Login function
  const login = (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        openDatabase().then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM users WHERE email = ? AND password = ?',
              [email, password],
              (_, {rows}) => {
                if (rows.length > 0) {
                  const userData = rows.item(0);
                  resolve({
                    success: true,
                    user: {
                      firstName: userData.firstName,
                      lastName: userData.lastName,
                      email: userData.email,
                    },
                  });
                } else {
                  resolve({
                    success: false,
                    error: 'Invalid email or password.',
                  });
                }
              },
              (_, err) => {
                console.log('Error during login:', err);
                reject(new Error('Error logging in'));
                return true; // Stops the transaction in case of error
              },
            );
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Load initial database and set user if needed
  useEffect(() => {
    const init = async () => {
      await initDb();
    };

    init();
  }, []);

  return {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
  };
};

export default useAuth;
