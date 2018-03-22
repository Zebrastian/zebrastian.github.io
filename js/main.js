var lightnessFactor1;
var lightnessFactor2;
var contrastRatio;

function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function colorNameToHex(color) {
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4",
        "azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd",
        "blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0",
        "chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc",
        "crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b",
        "darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b",
        "darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000",
        "darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f",
        "darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff",
        "dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0",
        "forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700",
        "goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0",
        "hotpink":"#ff69b4","indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
        "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd",
        "lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
        "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a",
        "lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
        "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff",
        "maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3",
        "mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a",
        "mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa",
        "mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6",
        "olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
        "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093",
        "papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd",
        "powderblue":"#b0e0e6","purple":"#800080","rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f",
        "royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57",
        "seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd",
        "slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c",
        "teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee",
        "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"};
    if (typeof colors[color.toLowerCase()] != 'undefined') return colors[color.toLowerCase()];
    else if(color.startsWith('#')) return color;
    else if(color.includes(',')) return rgbToHex(color);
    else return '#' + color;
}

function rgbToHex(rgb) {
    var r = parseInt(rgb.substring(0, rgb.indexOf(",")));
    var g = parseInt(rgb.substring(rgb.indexOf(",")+1, rgb.lastIndexOf(",")));
    var b = parseInt(rgb.substring(rgb.lastIndexOf(",")+1, rgb.length));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    hex = hex.substring(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b].join();
}

function calcLuminance(rgb) {
    var components = [  parseInt(rgb.substring(0, rgb.indexOf(","))) / 255,
                        parseInt(rgb.substring(rgb.indexOf(",")+1, rgb.lastIndexOf(","))) / 255,
                        parseInt(rgb.substring(rgb.lastIndexOf(",")+1, rgb.length)) / 255];
    for(var i = 0; i < components.length; i++)
        components[i] = components[i] < 0.03928 ? components[i] / 12.92 : Math.pow((components[i] + 0.055) / 1.055, 2.4);
    return 0.2126 * components[0] + 0.7152 * components[1] + 0.0722 * components[2];
}

function calcContrastRatio(color1, color2) {
    var lum1 = calcLuminance(hexToRgb(colorNameToHex(color1)));
    var lum2 = calcLuminance(hexToRgb(colorNameToHex(color2)));

    return Math.round((lum1 >= lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)) * 100) / 100;
}

function changeLightnessFactor() {
    lightnessFactor1 = 0.1 * document.getElementById('contrastSlider1').value;
    lightnessFactor2 = 0.1 * document.getElementById('contrastSlider2').value;
}

function displayColor(listenerOn, listenerType, input1, input2, bgToColorize, textToColorize, toDisplayLuminance, toDisplayContrastRatio) {
    document.getElementById(listenerOn).addEventListener(listenerType, function() {
        changeLightnessFactor();
        var color1 = shadeColor(colorNameToHex(document.getElementById(input1).value), lightnessFactor1);
        var color2 = shadeColor(colorNameToHex(document.getElementById(input2).value), lightnessFactor2);
        var relativeLuminance1 = calcLuminance(hexToRgb(colorNameToHex(color1)));
        var relativeLuminance2 = calcLuminance(hexToRgb(colorNameToHex(color2)));
        contrastRatio = calcContrastRatio(color1, color2);
        if(bgToColorize != null && textToColorize == null) {
            document.getElementById(bgToColorize).style.backgroundColor = color1;
            document.getElementById(toDisplayLuminance).innerHTML = relativeLuminance1;
        }
        else if(textToColorize != null && bgToColorize == null) {
            document.getElementById(textToColorize).style.color = color2;
            document.getElementById(toDisplayLuminance).innerHTML = relativeLuminance2;
        }
        else {
            document.getElementById(toDisplayLuminance).innerHTML = "Something went wrong here";
        }
        document.getElementById(toDisplayContrastRatio).innerHTML = "New Contrast Ratio: " + contrastRatio;
    });
}

displayColor('contrastSlider1', 'input', 'backgroundInput', 'textInput', 'contrastDiv', null, 'backgroundLum', 'newContrastRatio');
displayColor('backgroundInput', 'input', 'backgroundInput', 'textInput', 'contrastDiv', null, 'backgroundLum', 'newContrastRatio');
displayColor('contrastSlider2', 'input', 'backgroundInput', 'textInput', null, 'newContrastRatio', 'textLum', 'newContrastRatio');
displayColor('textInput', 'input', 'backgroundInput', 'textInput', null, 'newContrastRatio', 'textLum', 'newContrastRatio');
