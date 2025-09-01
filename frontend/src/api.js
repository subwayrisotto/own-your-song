import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5050";

// Get all subscriptions
export async function getSubs() {
    try {
        const response = await axios.get(`${URL}/subscriptions`);
        if (response.status === 200) {
            return response.data; // Return the data directly
        } else {
            throw new Error(`Failed to fetch subscriptions: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Get a single subscription by ID
export async function getSub(id) {
    try {
        const response = await axios.get(`${URL}/subscriptions/${id}`);
        if (response.status === 200) {
            return response.data; // Return the data directly
        } else {
            throw new Error(`Failed to fetch subscription with ID ${id}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching subscription:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Create a new subscription
export async function createSubs(post) {
    try {
        const response = await axios.post(`${URL}/subscriptions`, post);
        return response.data; // Return the created subscription data
    } catch (error) {
        console.error("Error creating subscription:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Update a subscription by ID
export async function updateSub(id, post) {
    try {
        const response = await axios.put(`${URL}/subscriptions/${id}`, post);
        return response.data; // Return the updated subscription data
    } catch (error) {
        console.error("Error updating subscription:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Delete a subscription by ID
export async function deleteSub(id) {
    try {
        const response = await axios.delete(`${URL}/subscriptions/${id}`);
        if (response.status === 200) {
            return response.data; // Return success message or result
        } else {
            throw new Error(`Failed to delete subscription with ID ${id}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error deleting subscription:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Get all samples
export async function getSamples() {
    try {
        const response = await axios.get(`${URL}/samples`);
        if (response.status === 200) {
            return response.data; // Return the data directly
        } else {
            throw new Error(`Failed to fetch samples: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching samples:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Get a single sample by ID
export async function getSample(id) {
    try {
        const response = await axios.get(`${URL}/samples/${id}`);
        if (response.status === 200) {
            return response.data; // Return the data directly
        } else {
            throw new Error(`Failed to fetch sample with ID ${id}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching sample:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Create a new sample
export async function createSamples(post) {
    try {
        const response = await axios.post(`${URL}/samples`, post);
        return response.data; // Return the created sample data
    } catch (error) {
        console.error("Error creating sample:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Update a sample by ID
export async function updateSample(id, post) {
    try {
        const response = await axios.put(`${URL}/samples/${id}`, post);
        return response.data; // Return the updated sample data
    } catch (error) {
        console.error("Error updating sample:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Delete a subscription by ID
export async function deleteSample(id) {
    try {
        const response = await axios.delete(`${URL}/samples/${id}`);
        if (response.status === 200) {
            return response.data; // Return success message or result
        } else {
            throw new Error(`Failed to delete sample with ID ${id}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error deleting sample:", error);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function generateGuestToken(email) {
    try {
        const response = await axios.post(`${URL}/guest-token`, { email });
        if (response.data.guestToken) {
            localStorage.setItem("guestToken", response.data.guestToken); // Store guest token
            return response.data; // Return the response with the guestToken
        }
        throw new Error("Failed to generate guest token");
    } catch (error) {
        console.error("Error generating guest token:", error);
        throw error;
    }
}

export async function createPayment(data) {
    try {
        let token = localStorage.getItem("userToken");  // Check if the user is logged in
        if (!token) {
            // If there's no userToken, check for guestToken
            token = localStorage.getItem("guestToken");
        }

        if (!token) {
            console.error("Authorization token is missing (userToken or guestToken)");
            return;
        }

        const response = await axios.post(
            `${URL}/checkout-session`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
                }
            }
        );

        if (response.data.url) {
            window.location.href = response.data.url;  // Redirect to Stripe Checkout
        } else {
            console.error("Payment session creation failed");
        }
    } catch (error) {
        console.error("Payment Error:", error);
        if (error.response) {
            console.error("Error Response Data:", error.response.data);  // Log the error response data
        }
    }
}

// sign up
export async function createUser(userData) {
    try {
        const response = await axios.post(`${URL}/sign-up`, userData);

        if (response.data.token) {
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("userRole", response.data.role);
            return response.data;
        }

        throw new Error("Token not received");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            return { error: error.response.data.message }; // Return meaningful error message
        }
        return { error: "Something went wrong. Please try again later." };
    }
}

// sign up with guest's order
export async function registerUserAndConvertGuestOrders(signUpData) {
    const guestToken = localStorage.getItem('guestToken'); // Get the guestToken (if exists)

    // If no guestToken is found, there's nothing to convert, return early
    if (!guestToken) {
        console.log("No guest token found, skipping order conversion.");
        return;
    }

    const requestData = {
        guestToken,
        userData: signUpData,
    };
    console.log("Request payload for guest order conversion:", requestData);

    try {
        // Step 1: If user isn't registered yet, we need to register
        let response;
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            // User is not signed up yet, proceed to register
            response = await createUser(signUpData); // Register the user
            console.log("User registration response:", response);

            // After registration, store the user's token
            localStorage.setItem("userToken", response.token); // Store the new user's auth token
        } else {
            // User is already signed up, use the existing userToken
            response = { token: userToken }; // Use the existing token
            console.log("User already registered, using existing token:", response);
        }

        // Step 2: After registration (or if already registered), convert guest orders to user orders
        // Call the backend to convert guest orders to user orders
        const convertResponse = await axios.post(
            `${URL}/convert-guest-orders`,  // Backend route to convert orders
            { guestToken },  // Pass the guestToken in the body
            {
                headers: {
                    'Authorization': `Bearer ${response.token}`, // Send the user's token
                },
            }
        );
        console.log("Guest orders converted successfully:", convertResponse);

        // Remove the guestToken after conversion and successful registration
        localStorage.removeItem("guestToken");

        return response; // Return the user data (with token) after successful registration and order conversion
    } catch (error) {
        console.error("Error during registration and guest order conversion:", error);
        throw error; // Rethrow error for handling in the calling function
    }
}

// Sign in
export async function loginUser(email, password) {
    const response = await fetch(`${URL}/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 404) {
            throw new Error('User does not exist. Please sign up.');
        }

        throw new Error(errorData.message || 'Failed to login');
    }

    const data = await response.json();  // User data and token

    return data;  // Return user data and token if successful
}

export async function getUser() {
    const token = localStorage.getItem("userToken"); 
    if (!token) {
        console.error('No token found');
        return;
    }
    try {
        const response = await fetch(`${URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }

        const data = await response.json();
        
        return data.user;
    } catch (err) {
        console.error('Error:', err.message);  // Handle errors
    }
}

// Logout user
export async function logoutUser() {
    const token = localStorage.getItem("userToken");

    if (!token) {
        console.log("User is already logged out.");
        return; 
    }

    try {
        const response = await axios.post(`${URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Logged out successfully.");
            localStorage.removeItem("userToken");
            localStorage.removeItem("userRole");
        } else {
            throw new Error("Failed to logout.");
        }
    } catch (error) {
        console.error("Error logging out:", error);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
    }
}

export async function getUserOrders() {
    const token = localStorage.getItem("userToken"); // ✅ Retrieve token

    if (!token) {
        throw new Error("User is not authenticated.");
    }

    try {
        const response = await axios.get(`${URL}/user-orders`, {
            headers: {
                'Authorization': `Bearer ${token}` // ✅ Send token for authentication
            }
        });

        if (response.status === 200) {
            console.log("Orders retrieved:", response.data); // ✅ Debugging
            return response.data;
        } else {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function getOrders() {
   const token = localStorage.getItem("userToken"); // ✅ Retrieve token
   const userRole = localStorage.getItem("userRole");

    if (!token) {
        throw new Error("User is not authenticated.");
    }

    if (userRole !== "admin") {
        throw new Error("Access denied. Admins only.");
    }

    try {
        const response = await axios.get(`${URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
            throw new Error(`Failed to fetch admin orders: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching admin orders:", error);
        throw error;
    }
}

export async function markOrderAsComplete(orderId) {
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(`${URL}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
      });
      console.log("This is test")
      if (!response.ok) throw new Error("Failed to update order");
  
      return await response.json(); 
    } catch (error) {
      console.error("Error updating order:", error);
      return null;
    }
  }

export async function getUsers() {
    const token = localStorage.getItem("userToken"); // Retrieve token
    const userRole = localStorage.getItem("userRole");

    // Check if user is authenticated and has the 'admin' role
    if (!token) {
        throw new Error("User is not authenticated.");
    }

    if (userRole !== "admin") {
        throw new Error("Access denied. Admins only.");
    }

    try {
        // Make the API call to fetch users (excluding admins)
        const response = await axios.get(`${URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data.users;
        } else {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const forgotPassword = async (email) => {
    try {
        // Send the POST request to the /forgot-password route on your server
        const response = await axios.post(`${URL}/forgot-password`, { email });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("User not found"); // This will be caught in the component
        } else {
            throw new Error("Something went wrong. Please try again.");
        }
    }
};

export const resetPassword = async (password, confirmPassword, token) => {
    try {
        const response = await axios.post(`${URL}/reset-password`, {
            password,
            confirmPassword,
            token,
        });

        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Password reset failed');
    }
};

export const sendBusinessOrder = async (data) => {
    try {
        const response = await axios.post(`${URL}/business-order`, data);
    
        if (response.status === 201) {
            console.log("Application submitted successfully!");
          } else {
            console.error("Failed to submit application:", response.data?.error);
          }
      } catch (error) {
        console.error("Network error: " + error.message);
      }
};