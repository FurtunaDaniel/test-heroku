'use strict';
const fs = require('fs');
const {jwt, CryptoJS} = require('./dependencies');

const generate_token = (data) => {

  if(data.env == "development" || data.env == "staging" || data.env == "production") {

    if(data.env == "development") {
      var private_buff = new Buffer(process.env.private_key, 'base64');
      var privateKey = private_buff.toString('ascii');
      var iv_string = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.hex)
    }
    if(data.env == "staging") {
      var private_buff = new Buffer(process.env.private_key, 'base64');
      var privateKey = private_buff.toString('ascii');
      var iv_string = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.hex)
    }

    if(data.env == "production") {
      var private_buff = new Buffer(process.env.private_key_production, 'base64');
      var privateKey = private_buff.toString('ascii');
      console.log(privateKey);
      var iv_string = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.hex)
    }

    var jrni_cypher_key = CryptoJS.enc.Hex.parse(data.cipher_key);
    var jrni_cypher_key = CryptoJS.enc.Hex.parse(data.cipher_key);
    var iv = CryptoJS.enc.Utf8.parse(iv_string);
    var unencrypted_data = JSON.parse(fs.readFileSync('./scripts/files/request.json'));

    if(data.uan) {
      unencrypted_data["uan"] = data.uan;
    };
    if(data.service) {
      // add service the custom service in payload
      unencrypted_data["partnerServices"][0] = data.service;
    }
    if(data.language) {
       // add service the translator gender and language in payload
      unencrypted_data.partnerServiceRequirements = {};
      unencrypted_data.partnerServiceRequirements['translatorLanguage'] = data.language;
      unencrypted_data.partnerServiceRequirements['translatorGender'] = data.gender;
    };
    unencrypted_data["dateOfApplication"] = data.application_date;
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(unencrypted_data), jrni_cypher_key, {iv: iv});
    var working_token_received_by_the_function = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    var jwtDecrypted = {}
    jwtDecrypted["fes:data"] = working_token_received_by_the_function;
    jwtDecrypted["fes:iv"] = CryptoJS.enc.Base64.stringify(iv);
    const token = jwt.sign(jwtDecrypted, privateKey, {algorithm: 'RS256', issuer: 'dcj'});
    return token
  } else {
    return "env not supported"
  }
};


module.exports = generate_token
