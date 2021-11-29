// const { default: axios } = require("axios");

$("#trigger-webhooks-btn").click(() => { console.log(typeof window.editor.getValue()); })

async function triggerWebhooks() {
    try {
        axios.post('http://localhost:3000/trigger', JSON.parse(window.editor.getValue()), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
    } catch (err) {
        alert('Unable to trigger webhooks - error response from server');
        console.log(err.message);
    }
}