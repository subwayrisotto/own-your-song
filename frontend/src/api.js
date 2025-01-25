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