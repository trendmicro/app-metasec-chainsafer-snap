---
markmap:
  colorFreezeLevel: 4
---

# **ChainSafer Snap**

## **User Flow**
### Install flow 
- 1.check is metamask flask 
- 2.connect snap
- 3.approve snap permission

### Connect account flow 
- 1.connect account
- 2.switch account
- 3.disconnect account

### Login flow 
#### sign up  
##### Response: 200 | 409 
- 1.get nonce
- 2.metamask signature
- 3.login
##### Response: 400 5XX 
- system error (error handle)
#### login 
##### Response: 200
- snap upgrade account 
##### Response: 4XX | 5XX 
- system error (error handle)
 
## **Features**
### **Site**
#### Account managment
- sign up
- get nonce
- login
- logout

#### Metamask interaction
- connect account
- switch account 
- disconnect account
- sign message with metamask
- retrieve signature after sign

#### State Mechanism
- build react state mechanism
- account state
- connect state
- login state

#### Middleware for Sanp Account 
- [BE] upgrade account  for snap user
- [FED] upgrade account middleware relevant handling

### **Snap**

#### On RpcRequest Handler
- case of store data
- case of update data
- case of retrieve data

#### On Transaction Handler
- risk summary 
- transaction risk
- snap layout

#### On Cronjob Handler
- invoke cronjob period setup
- renew token 

#### Store Management
- store data 
- update data 
- retrieve data
- clear data

## **CI/CD**
### **Site**
- build ci 
- build cd 
- deploy
### **Snap**
- build ci 
- build cd 
- deploy