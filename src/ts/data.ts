export default {
    getData(){
        let socket = new WebSocket("ws://192.168.0.13:8080");

        socket.onopen = function(e) {
            console.log("Connection established");
        };

        socket.onmessage = function(event) {
            let text = event.data;
            let data_list = (<string> text.slice(1,-1)).split(",");
            let client = data_list[0];

            let height = document.body.clientHeight;
            let width = document.body.clientWidth;

            console.log(height + " "+ width)

            if(isNumeric(client)){
                let latitude = data_list[1];
                let longitude = data_list[2];
                let altitude = data_list[3];
                let light = data_list[4];
                console.log(client + " " + latitude + " " + longitude + " "+ altitude+ " "+ light);

                let svgns = "http://www.w3.org/2000/svg"
                let mask = document.getElementById( 'circles' );
                let circle = document.getElementById( 'circle'+client);
                if (circle)
                    circle.remove()
                let new_circle = document.createElementNS(svgns, 'circle');
                let r = parseFloat(light) / 2;

                let topCornerLatitude = 50.46576243059835;
                let topCornerLongitude = 4.856998970910766;
                let distanceHeight = 1.77925912479;
                let distanceWidth = 9.55060015441;
                let x = 0;
                let y = 0;
                let numRatio = 16;
                let denumRatio = 9;

                if (width > (height/denumRatio) *numRatio){
                    x += (width - (height/9)*16) /2
                }else{
                    y += ((width*9)/16)/2
                }
                console.log(x + " " + y)

                x +=(4/460 * width)
                y +=(27/90 * height)

                console.log(x + " " + y)

                x += ((Math.sqrt(Math.pow(parseFloat(longitude) - topCornerLongitude,2)) *10000) / distanceWidth) * (width -2*x)
                y += ((Math.sqrt(Math.pow(parseFloat(latitude) - topCornerLatitude,2)) *10000) / distanceHeight) * (height - 2*y)

                console.log(x + " " + y)

                new_circle.setAttributeNS(null, 'id', "circle" + client);
                new_circle.setAttributeNS(null, 'cx', String(x));
                new_circle.setAttributeNS(null, 'cy', String(y));
                new_circle.setAttributeNS(null, 'r', String(r));
                new_circle.setAttributeNS(null, 'style', "fill: black;");
                new_circle.setAttributeNS(null, 'filter', "url(#f1)");
                mask.appendChild(new_circle);
            }
        };
    }
};

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
