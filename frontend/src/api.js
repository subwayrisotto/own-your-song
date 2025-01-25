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