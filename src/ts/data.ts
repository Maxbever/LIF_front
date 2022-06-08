export default {
    getData(){
        let socket = new WebSocket("ws://192.168.0.13:8080");

        socket.onopen = function(e) {
            console.log("Connection established");
        };


        socket.onmessage = function(event) {
            const reader = new FileReader();
            // This fires after the blob has been read/loaded.
            reader.addEventListener('loadend', (e) => {
                const text = e.target.result;
                console.log(text);
            });

            // Start reading the blob as text.
            reader.readAsText(event.data);
        };
    }
};
