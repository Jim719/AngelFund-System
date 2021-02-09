function doSomething1() {
    console.log("doSomething1 start");
    return new Promise(function(resolve, reject) {
      console.log("doSomething1 end");
      resolve(1);
    });
  }
  
  function doSomething2() {
    console.log("doSomething2");
    return 2;
  }
  
  function finalThing(value) {
    console.log("finalThing");
    console.log(value);
    return 0;
  }
  
//   //第1種傳入參數
//   doSomething1()
//     .then(doSomething2)
//     .then(finalThing);
  
  //第2種傳入參數
//   doSomething1()
//     .then(doSomething2())
//     .then(finalThing);
  
//   //第3種傳入參數
  doSomething1()
    .then(function() {
      doSomething2();
    })
    .then(finalThing);
  
//   //第3種傳入參數
//   doSomething1()
//     .then(function() {
//       return doSomething2();
//     })
//     .then(finalThing);
  

// const promise = new Promise(function(resolve, reject) {
//     resolve(1);
//   });
  
//   const p = promise;
  
//   const p1 = promise.then(value => {
//     console.log(value);
//     return value + 1;
//   });
  
//   const p2 = promise.then(value => {
//     console.log(value);
//     return value + 1;
//   });
  
//   //延時執行
//   setTimeout(() => {
//     console.log(p1);
//     console.log(p2);
//     console.log(p1 === p2); //false
//     console.log(p === promise); //true
//   }, 5000);



// //使用reject無法使用throw
// const p1 = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       // 這裡如果用throw，是完全不會拒絕promise
//       reject(new Error("error occur!"));
//       //throw new Error('error occur!')
//     }, 1000);
//   });
  
//   p1.then(val => {
//     console.log(val);
//     return val + 2;
//   })
//     .then(val => console.log(val))
//     .catch(err => console.log("error:", err.message))
//     .then(val => console.log("done"));





// // 用throw語句取代reject
// const p1 = new Promise((resolve, reject) => {
//     //resolve(3);
//     throw new Error("rejected!"); // 用throw語句
//     //相當於用以下的語句
//     //reject(new Error('rejected!'))
//   });
  
//   p1.then(val => {
//     console.log(val);
//     return val + 2;
//   })
//     .then(val => console.log(val))
//     .catch(err => console.log("error:", err.message))
//     .then(val => console.log("done"));
  





//回傳值有error範例
// const p1 = new Promise((resolve, reject) => {
//     resolve(4);
//   });
  
//   p1.then(val => {
//     console.log(val); //4
//     return val + 2;
//   })
//     .then(val => {
//       console.log(val); //6
//       throw new Error("error!");
//     })
//     .catch(err => {
//       //catch無法抓到上個promise的回傳值
//       console.log(err.message);
//       //這裡如果有回傳值，下一個then可以抓得到
//       //return 100
//     })
//     .then(val => console.log(val, "done")); //val是undefined，回傳值消息




//.then方法實作
// const promise = new Promise(function(resolve, reject) {
//     resolve(1);
//   });
  
//   promise
//     .then(function(value) {
//       console.log(value); // 1
//       return value + 1;
//     })
//     .then(function(value) {
//       console.log(value); // 2
//       return value + 2;
//     })
//     .then(function(value) {
//       console.log(value); // 4
//     }); 