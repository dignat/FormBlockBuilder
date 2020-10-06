import {toHtml} from "@fortawesome/fontawesome-svg-core";

const generatePdf = function(jsonArray) {
    let hasToStop = false;
    let table = "<table>\n";
    let lastElement = jsonArray.length;
    let j = 0;
    for (let i = 0; i < jsonArray.length; i++) {
        j++;
        if (jsonArray[i].type !== 'text' && jsonArray[i].type !== 'inputlist' && jsonArray[i].type !== 'inputrepeat') {
            table += "\n   <tr>" +
                "\n      <td>" + jsonArray[i].title + "</td>" +
                + jsonArray[i].idKey !== undefined && jsonArray[i].idKey === 'id' ? "\n      <tr>\n       <td>" +jsonArray[i].title + "</td>\n       <td><strong>" + '{{_.element(data.' + jsonArray[i].name + ',' +'"'+jsonArray[i].labelKey+'"' +')}}' + "</strong></td>"+'\n</tr>' : "\n    <tr>\n           <td>" +jsonArray[i].title +  "</td>\n<td><strong>" + '{{data.' + jsonArray[i].name + '}}' + "</strong></td>" +
                "\n  </tr>\n"
        } else {
            hasToStop = true;
        }
        if (hasToStop && jsonArray[i].type === 'text') {
            table = j === lastElement && j !== 1 ? table +'\n</table>\n' + jsonArray[i].body : j !== 1 ? table +'\n</table>\n' + jsonArray[i].body + '\n<table>\n' : jsonArray[i].body+ '<table>';
        }
        if (hasToStop && jsonArray[i].type === 'inputlist') {
            table = j === lastElement && j !== 1 ? table+'\n</table>' : j !== lastElement && j !== 1 ?  table+ '<table>' : '';
            table += '\n<table>';
            table += '\n        <thead>';
            table += '\n    <tr>';

            for (let list=0;list<jsonArray[i].template.length; list++) {
                table += '\n            <th>'  + jsonArray[i].template[list].title + '</th>';
            }
            table += '\n    </tr>';
            table += '\n        </thead>';
            table += `\n    <tbody>`;
            table += `\n{% for ${ jsonArray[i].name} in data. ${jsonArray[i].name} %}`;
            table += '\n    <tr>';
            for (let inside=0; inside < jsonArray[i].template.length; inside++) {
                table += '\n        <td>{{'+jsonArray[i].name + '.' +jsonArray[i].template[inside].name + '}}</td>';
            }
            table += '\n    </tr>';
            table += '\n    {% endfor %}\n';
            table += '\n    </tbody>';
            table += j !== lastElement ? '\n</table>\n<table>' : '';
        }
        if (hasToStop && jsonArray[i].type === 'inputrepeat') {
            table = j === lastElement && j !== 1 ? table+'\n</table>' : j !== lastElement && j !== 1 ?  table+ '<table>' : '';
            table += '\n<table>';
            table += '\n        <thead>';
            table += '\n    <tr>';
            for (let list=0;list<jsonArray[i].items.length; list++) {
                table += '\n            <th>'  + jsonArray[i].items[list].title + '</th>';
            }
            table += '\n    </tr>';
            table += '\n        </thead>';
            table += '\n    <tbody>';
            table += '\n{% for ' + jsonArray[i].name +' in data.'+ jsonArray[i].name + '%}';

            table += '\n    <tr>';
            for (let inside=0; inside < jsonArray[i].items.length; inside++) {
                switch(jsonArray[i].items[inside].type) {
                    case 'inputlookup':
                        if (jsonArray[i].items[inside].idKey !== undefined && jsonArray[i].items[inside].idKey === 'id') {
                            console.log('idkey')
                            table += '\n        <td>{{_.element('+jsonArray[i].name + '.' +jsonArray[i].items[inside].name + ', '+ '"'+ jsonArray[i].items[inside].labelKey +'"'+')}}</td>';
                        }
                        break;
                    default:
                        table += '\n        <td>{{'+jsonArray[i].name + '.' +jsonArray[i].items[inside].name + '}}</td>';
                }
            }
            table += '\n    </tr>';
            table += '\n    {% endfor %}\n';
            table += '\n    </tbody>';
            table += j !== lastElement ? '\n</table>\n<table>' : '';
        }
    }
    table +=  j === lastElement && !hasToStop ? '\n</table>' : j === lastElement  ? '</table>\n' : '';
    console.log(j, lastElement);
    return table;
};

export default generatePdf