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
  bio: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
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
          password TEXT,
          bio TEXT DEFAULT ''
        )`,
        [],
        () => {},
        (_, err) => {
          console.log('Error creating users table:', err);
        },
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
            'INSERT INTO users (firstName, lastName, email, password, bio) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, password, ''], // Default empty bio
            (_, result) => {
              if (result.rowsAffected > 0) {
                resolve({
                  success: true,
                  user: {firstName, lastName, email, bio: ''},
                });
              } else {
                resolve({
                  success: false,
                  error: 'Failed to create user.',
                });
              }
            },
            (err: any) => {
              console.log('Error creating user:', err);
              if (err.message.includes('UNIQUE constraint failed')) {
                resolve({
                  success: false,
                  error: 'Email already exists.',
                });
              } else {
                resolve({
                  success: false,
                  error: 'An error occured', // General SQL error message
                });
              }
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
                      bio: userData.bio,
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

  // Update user function
  const updateUser = (
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        const db = await openDatabase();

        console.log('Updating user with:', {email, firstName, lastName, bio});

        await db.transaction(tx => {
          tx.executeSql(
            'UPDATE users SET firstName = ?, lastName = ?, bio = ? WHERE email = ?',
            [firstName, lastName, bio, email],
            (_, result) => {
              if (result.rowsAffected > 0) {
                console.log('User updated successfully');

                setUser({firstName, lastName, email, bio});

                resolve({
                  success: true,
                  user: {firstName, lastName, email, bio},
                });
              } else {
                console.log('No rows affected');
                resolve({
                  success: false,
                  error: 'Failed to update user.',
                });
              }
            },
            (_, err) => {
              console.error('SQL Error:', err);
              resolve({
                success: false,
                error: `SQL Error: ${err.message}`,
              });
              return true;
            },
          );
        });
      } catch (err) {
        console.error('Transaction Error:', err);
        reject(new Error('Error updating user'));
      } finally {
        setIsLoading(false);
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  // Initialize database
  useEffect(() => {
    const init = async () => {
      await initDb();
    };

    init();
  }, []);

  return {
    user,
    isLoading,
    signup,
    login,
    logout,
    updateUser,
  };
};

export default useAuth;
