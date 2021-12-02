$("#trigger-webhooks-btn").click(triggerWebhooks);

async function triggerWebhooks() {
    try {
        await axios.post('http://localhost:3000/trigger', JSON.parse(window.editor.getValue()), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        alert('Webhooks triggered');
    } catch (err) {
        alert('Unable to trigger webhooks - error response from server');
        console.log(err.message);
    }
}