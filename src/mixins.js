 const appMixin = {
 data() {
     return {

     }
 },
     methods: {
         nameGenerator (str, slices) {
             let regex = str.replace(/[\d,&,-/_?():.]/g,"").toLowerCase();
             let strArray = regex.split(' ');
             console.log(str, 'the title')
             if (strArray.length > 1) {
                 if (slices.length > 0) {
                        switch(slices.length) {
                            case 1:
                                return strArray[slices[0]];
                                break;
                            case 2:
                                return strArray[slices[0]].concat(strArray[slices[1]].charAt(0).toUpperCase()+strArray[slices[1]].slice(1));
                                break;
                            case 3:
                                return strArray[slices[0]].concat(strArray[slices[1]].charAt(0).toUpperCase()+strArray[slices[1]].slice(1)+strArray[slices[2]].charAt(0).toUpperCase()+strArray[slices[2]].slice(1));
                                break;
                            case 4:
                                return strArray[slices[0]].concat(strArray[slices[1]].charAt(0).toUpperCase()+strArray[slices[1]].slice(1)+strArray[slices[2]].charAt(0).toUpperCase()+strArray[slices[2]].slice(1)+strArray[slices[3]].charAt(0).toUpperCase()+strArray[slices[3]].slice(1));
                                break;

                        }
                 } else {
                     return strArray[0].concat(strArray[1].charAt(0).toUpperCase()+strArray[1].slice(1));
                 }
             } else {
                 console.log(strArray[0])
                 return strArray[0];
             }

         },
         uniqueFieldName(items) {
             if (items.length > 1) {
                let arrayOfNames = items.map((item) => item.name);
                arrayOfNames = arrayOfNames.filter((item) => item !== "");
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