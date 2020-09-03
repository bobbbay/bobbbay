use std::fs;

fn main() {
    let filename = "data/data.json";

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    let json: serde_json::Value =
        serde_json::from_str(&contents).expect("JSON was not well-formatted");

    println!("{}", json["interests"]);
}
