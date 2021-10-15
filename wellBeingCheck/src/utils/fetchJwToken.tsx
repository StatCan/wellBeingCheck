/** @format */

import NetInfo from "@react-native-community/netinfo";
import { AsyncStorage, Alert } from "react-native";
//import { resources } from '../../GlobalResources';
export function fetchJwToken1() {
  let token = "123456";
  return new Promise((resolve) => {
    var now = new Date();
    var diffTime = Math.abs(now - global.tokenDoB) / 1000 / 60;
    if (global.jwToken != "" && diffTime < 15) {
      console.log("get token");
      resolve(global.jwToken);
    } else {
      if (global.userToken != "" && global.password != "") {
        let url =
          global.webApiBaseUrl +
          "Token/" +
          global.userToken +
          "/" +
          global.password;
        console.log("fetch token");
        fetch(url, { method: "POST" })
          .then((response) => response.json())
          .then((responseJson) => {
            global.jwToken = responseJson;
            token = responseJson;
            global.tokenDoB = new Date();
            resolve(token);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  });
}

export function checkConnection() {
  return new Promise((resolve) => {
    NetInfo.fetch().then((state) => {
      //  console.log('Connection type', state.type);
      //console.log('Is connected?', state.isConnected);
      //  alert('Connection type:'+ state.type+'->Is connected?'+state.isConnected);
      resolve(state.isConnected);
    });
  });
}

export function hashString(str, salt) {
  let str= str.replace(/\s/g, '');
  let a = str.split("").reverse().join("") + salt;
  let b = a.toLowerCase();
  return b;
}

export function checkConnection1() {
  return new Promise((resolve) => {
    let url = global.webApiBaseUrl + "CheckConnection";
    console.log(url);
    fetch(url, { method: "GET" })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((responseJson) => {
            if (responseJson == "OK") {
              console.log("OK");
              global.connectivity = true;
              resolve(true);
            } else {
              global.connectivity = false;
              console.log("Bad");
              resolve(false);
            }
          });
        } else {
          global.connectivity = false;
          console.log("Bad");
          resolve(false);
        }
      })
      .catch((error) => {
        console.error("Bad: " + error);
        resolve(false);
      });
  });
}
export function fetchJwToken() {
  let url = global.webApiBaseUrl + "api/security/token";
  console.log(global.sac);
  let data = {
    deviceId: global.userToken,
    sac: global.sac,
    password: hashString(global.password, global.passwordSalt),
  };
  //   let data={deviceId:'iphone5yu',sac:'6881265148395520',password:'patateHacheAvecSel'}
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function parseJwt(token) {
  var jwtDecode = require("jwt-decode");
  return jwtDecode(token);
}
export function saveParaData(jwt, paraData) {
  let url = global.webApiBaseUrl + "api/paradata";
  console.log(url);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(paraData),
  })
    .then((response) => {
      if (response.status == 200) {
        console.log("paradata saved successfully");
        AsyncStorage.setItem("ParadataSaved", "true");
        global.paradataSaved = true;
        return true;
      } else {
        console.log("paradata Bad:" + response.status);
        return false;
      }
    }) // response.json())
    .catch((error) => {
      console.log(error.message);
      return false;
    });
}

export async function fetchGraphs(types, deviceWidth, deviceHeight) {
  let hh = deviceHeight - 220;
  let hh1 = deviceHeight - 300;
  let ww = deviceWidth - 80;
  let index = 0;
  for (var i = 0; i < types.length; i++) {
    let url = global.webApiBaseUrl + "api/dashboard/graph/" + types[i];
    url += "?width=" + deviceWidth + "&height=" + hh;
    fetchImage(url, index, "en");
    index++;
    fetchImage(url, index, "fr");
    index++;
  }
  AsyncStorage.setItem("hasImage", "1");
  console.log("Fetch images done");
}
export async function fetchGraphTypes() {
  let types = [];
  let url = global.webApiBaseUrl + "api/dashboard/graphs";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.jwToken,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result != null && result.length > 0) {
        result.forEach(function (graphLink) {
          types.push(graphLink.type);
        });
      }
      return types;
    })
    .catch((error) => {
      console.warn(error);
      return types;
    });
}
export function fetchImage(url, index, culture) {
  let token = global.jwToken;
  fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token, "Accept-language": culture },
  })
    .then((response) => {
      console.log(response.status);
      global.fetchCount++;
      if (response.status == 200) {
        response.blob().then((blob) => {
          var reader = new FileReader();
          reader.onload = function () {
            ++global.busy;
            //  console.log('********************image' + index); console.log("Busy flag in eq:"+global.busy);
            AsyncStorage.setItem("image" + index, this.result);
          };
          reader.readAsDataURL(blob);
        });
      } else {
        //  let tt = Alert.alert(resources.getString("internet.offline"));
        throw new Error(
          "Access denied, Try again later, if same thing would happen again contact StatCan"
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
