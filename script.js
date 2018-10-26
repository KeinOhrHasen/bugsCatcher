;(function(){
    const ajaxRequest = function(options){
        let url = options.url || "/";
        let method = "GET";
        let callback = options.callback || function(){};
        let data = options.data || {};
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.open(method, url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(data));
        
        xmlHttp.onreadystatechange =function(){
            if(xmlHttp.status == 200 && xmlHttp.readyState == 4){
                callback(xmlHttp.responseText);
            }
        };
    };

    let getData = function (){
        ajaxRequest({
            url: "/messages",
            method: "GET",
            callback: function(msg){
                msg = JSON.parse(msg);
                for (let i in msg){
                    if (msg.hasOwnProperty(i)){

                        // change UI speedometer  
                        let speed = msg[i].number;
                        let updatedSpeed; 
                        updatedSpeed = Math.round(speed*180/100)-45;

                        // use jQuery for selecting DOM objects and set new values
                        $("#speedbox-score").css("transform","rotate("+updatedSpeed+"deg)");
                        $("#bugs_value").text(msg[i].number);
                        $("#bugs_speed").text(+msg[i].number/2);
                    }   
                }
            }
        });
    };

    // send ajax request every 2 secont to server
    getData();
    setInterval(function(){
        getData();
    }, 2000);
})();
