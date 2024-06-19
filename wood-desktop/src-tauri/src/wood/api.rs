use reqwest::blocking::Client;
use serde::{Serialize, Deserialize};
static URL_API: &str = "http://216.225.203.244:3000/api";

#[tauri::command]
pub fn get_stock () -> Result<String, String>{
    let client  :Client = Client::new();
    let api = format!("{}{}", URL_API, "/stock");

    let response = client
        .get(api)
        .header("Content-Type","application/json")
        .header("Access-Control-Allow-Origin","*")
        .send()
        .map_err(|e| e.to_string())?;

    if response.status().is_success(){
        let body = response.text().map_err(|e| e.to_string())?;
        Ok(body)
    }else{
        Err(response.status().to_string())
    }
}