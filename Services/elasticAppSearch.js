const axios = require("axios")
const private_key = process.env.elastic_private_key
const search_key = process.env.elastic_search_key
class ElasticAppSearch {
    async searchEngine(query, ENGINE_NAME) {
        const response = await axios.post(`${process.env.elastic_url}/${ENGINE_NAME}/search`, {
            "query": query
        }, {
            headers: {
                Authorization: `Bearer ${search_key}`,
            },
        });
        return response.data
    } 
    async createEngine(name) {
        const response = await axios.post(process.env.elastic_url, {
            "name": name
        }, {
            headers: {
                Authorization: `Bearer ${private_key}`,
            },
        });
        return response.data
    }
    async updateEngine() {
    }
    async deleteEngine(ENGINE_NAME) {
        try {
            const data = await axios.delete(`${process.env.elastic_url}/${ENGINE_NAME}`, body, {
                headers: {
                    Authorization: `Bearer ${private_key}`,
                }
            });
            return data
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getEngineList() {
        const response = await axios.get(process.env.elastic_url, {
            headers: {
                Authorization: `Bearer ${private_key}`,
            }
        });
        return response.data.results
    }
    async createDocument(body, engine) {
        const response = await axios.post(`${process.env.elastic_url}/${engine}/documents`, body, {
            headers: {
                Authorization: `Bearer ${private_key}`,
            },
        });
        return response.data
    }
    async updateDocument(body, engine) {
        const response = await axios.patch(`${process.env.elastic_url}/${engine}/documents`, body, {
            headers: {
                Authorization: `Bearer ${private_key}`,
            },
        });
        return response.data
    }
    async deleteDocument(productId, engine) {
        const response = await axios.delete(`${process.env.elastic_url}/${engine}/documents`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${private_key}`,
            },
            data: [
                productId
            ]
        });
        return response.data
    }
    async getDocumentList(body) {
        try {
            const data = await axios.get(`${process.env.elastic_url}/${engine}/documents/list`, body, {
                headers: {
                    Authorization: `Bearer ${private_key}`,
                },
            });
            return data
        } catch (error) {
            console.log(error);
            return error
        }
    }
}
module.exports = new ElasticAppSearch();
