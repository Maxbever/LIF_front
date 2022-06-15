use local_ip_address::local_ip;
use rustupolis_server::client::Client;
use rustupolis_server::tuple;
use rustupolis_server::E;
use std::net::TcpListener;
use std::thread::{sleep, spawn};
use std::time::Duration;
use tungstenite::{accept, Message};

/// A WebSocket echo server
fn main() {
    let my_local_ip = local_ip().unwrap();
    let server = TcpListener::bind(my_local_ip.to_string() + ":8080").unwrap();

    for stream in server.incoming() {
        spawn(move || {

            let mut client = Client::new();
            let server_tcp_name = String::from("TCP_server");
            let attribute = String::from("admin");
            let tuple_space_name = String::from("DATA");
            let key = "secret_key_encry";

            let mut websocket = accept(stream.unwrap()).unwrap();

            client.connect(
                String::from("192.168.0.8"),
                String::from("9000"),
                String::from("tcp"),
                &server_tcp_name,
                key,
            );

            client.attach(&server_tcp_name, vec![attribute.clone()], &tuple_space_name);

            loop {
                let data = client.in_instr(vec![tuple![E::Any]]);

                sleep(Duration::new(2, 0));

                websocket.write_message(Message::from(data.to_string())).unwrap();
            }
        });
    }
}
