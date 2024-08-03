const autocannon = require('autocannon')

function runLoadTest(endpoint, method = 'GET', body = null) {
    return new Promise((resolve) => {
        const requestObject = {
            url: `http://localhost:3000${endpoint}`,
            method: method,
            headers: {
                'ApiKey': 'test',
                'Content-Type': 'application/json'
            },
            connections: 100,
            pipelining: 10,
            duration: 10,
        }

        if (body && (method === 'POST' || method === 'PUT')) {
            requestObject.body = JSON.stringify(body)
        }

        autocannon(requestObject, (err, results) => {
            console.log(`Load test results for ${method} ${endpoint}:`)
            console.log(`Requests/sec: ${results.requests.average}`)
            console.log(`Latency (ms): ${results.latency.average}`)
            console.log('-----------------------------')
            resolve(results)
        })
    })
}

async function runAllTests() {

    // POST request
    const newPost = { post: { title: 'New Post', text: 'This is a new post' } }
    await runLoadTest('/posts', 'POST', newPost)

    // GET requests
    await runLoadTest('/posts')
    await runLoadTest('/posts/1')

    // PUT request
    const updatedPost = { post: { title: 'Updated Post', text: 'This post has been updated' } }
    await runLoadTest('/posts/1', 'PUT', updatedPost)

    // DELETE request
    await runLoadTest('/posts/1', 'DELETE')
}

runAllTests()
