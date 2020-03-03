 const appMixin = {
 data() {
     return {

     }
 },
     methods: {
         nameGenerator (str) {
             let regex = str.replace(/[,&-/_?():.]/g,"").toLowerCase();
             let strArray = regex.split(' ');
             if (strArray.length > 1) { console.log(strArray.length)
                 return strArray[0].concat(strArray[1].charAt(0).toUpperCase()+strArray[1].slice(1));
             } else {
                 return strArray[0];
             }

         },
         uniqueFieldName(items) {
             if (items.length > 1) {
                let arrayOfNames = items.map((item) => item.name);
                return arrayOfNames.some((item, index) => arrayOfNames.indexOf(item) !== index)
             }
         },
         lookupNameGenerator(fieldTitle, idKey) {
             let fieldName = '';
             let regex = fieldTitle.replace(/[,&-/_?():.]/g,"").toLowerCase();
             let nameArray = regex.split(' ');
             if (idKey === 'id') {
                 fieldName = nameArray[0] + 'Id';
             } else {
                 fieldName = nameArray[0];
             }
             return fieldName;
         }
     }

 };



module.exports = appMixin;