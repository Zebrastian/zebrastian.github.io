var color1;
var color2;
var lightnessFactor1;
var lightnessFactor2;
var contrastRatio;

function translate(value, leftMin, leftMax, rightMin, rightMax) {
    var leftSpan = leftMax - leftMin;
    var rightSpan = rightMax - rightMin;
    var valueScaled = (value - leftMin) / leftSpan;
    return rightMin + valueScaled * rightSpan;
}

function wcagCompliant(ratio, level, size) {
    if(ratio >= 4.5 && ((level === "AA" && size === "normal") || (level === "AAA" && size === "large"))) return ["Pass","green"];
    else if(ratio >= 7 && level === "AAA" && size === "normal") return ["Pass","green"];
    else if(ratio >= 3 &&level === "AA" && size === "large") return ["Pass","green"];
    else return ["Fail","red"];
}

function makeCompliant(color1, color2) {
    while(calcContrastRatio(contrastRatio(color1, color2) < 4.5)) {
        lightnessFactor1 -= 0.01;
        console.log(lightnessFactor1);
        makeCompliant(color1, color2);
    }
}

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
    if (typeof colors[color.toLowerCase()] !== 'undefined') return colors[color.toLowerCase()];
    else if(color.startsWith('#')) return color;
    else if(color.includes(',')) return rgbToHex(color);
    else return '#' + color;
}

function hexToColorName(color) {
    var colors = {"#f0f8ff":"aliceblue","#faebd7":"antiquewhite","#00ffff":"cyan","#7fffd4":"aquamarine",
        "#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#000000":"black","#ffebcd":"blanchedalmond",
        "#0000ff":"blue","#8a2be2":"blueviolet","#a52a2a":"brown","#deb887":"burlywood","#5f9ea0":"cadetblue",
        "#7fff00":"chartreuse","#d2691e":"chocolate","#ff7f50":"coral","#6495ed":"cornflowerblue","#fff8dc":"cornsilk",
        "#dc143c":"crimson","#00008b":"darkblue","#008b8b":"darkcyan","#b8860b":"darkgoldenrod",
        "#a9a9a9":"darkgray","#006400":"darkgreen","#bdb76b":"darkkhaki","#8b008b":"darkmagenta",
        "#556b2f":"darkolivegreen","#ff8c00":"darkorange","#9932cc":"darkorchid","#8b0000":"darkred",
        "#e9967a":"darksalmon","#8fbc8f":"darkseagreen","#483d8b":"darkslateblue","#2f4f4f":"darkslategray",
        "#00ced1":"darkturquoise","#9400d3":"darkviolet","#ff1493":"deeppink","#00bfff":"deepskyblue",
        "#696969":"dimgray","#1e90ff":"dodgerblue","#b22222":"firebrick","#fffaf0":"floralwhite",
        "#228b22":"forestgreen","#ff00ff":"magenta","#dcdcdc":"gainsboro","#f8f8ff":"ghostwhite","#ffd700":"gold",
        "#daa520":"goldenrod","#808080":"gray","#008000":"green","#adff2f":"greenyellow","#f0fff0":"honeydew",
        "#ff69b4":"hotpink","#cd5c5c ":"indianred","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki",
        "#e6e6fa":"lavender","#fff0f5":"lavenderblush","#7cfc00":"lawngreen","#fffacd":"lemonchiffon",
        "#add8e6":"lightblue","#f08080":"lightcoral","#e0ffff":"lightcyan","#fafad2":"lightgoldenrodyellow",
        "#d3d3d3":"lightgrey","#90ee90":"lightgreen","#ffb6c1":"lightpink","#ffa07a":"lightsalmon",
        "#20b2aa":"lightseagreen","#87cefa":"lightskyblue","#778899":"lightslategray","#b0c4de":"lightsteelblue",
        "#ffffe0":"lightyellow","#00ff00":"lime","#32cd32":"limegreen","#faf0e6":"linen",
        "#800000":"maroon","#66cdaa":"mediumaquamarine","#0000cd":"mediumblue","#ba55d3":"mediumorchid",
        "#9370d8":"mediumpurple","#3cb371":"mediumseagreen","#7b68ee":"mediumslateblue","#00fa9a":"mediumspringgreen",
        "#48d1cc":"mediumturquoise","#c71585":"mediumvioletred","#191970":"midnightblue","#f5fffa":"mintcream",
        "#ffe4e1":"mistyrose","#ffe4b5":"moccasin","#ffdead":"navajowhite","#000080":"navy","#fdf5e6":"oldlace",
        "#808000":"olive","#6b8e23":"olivedrab","#ffa500":"orange","#ff4500":"orangered","#da70d6":"orchid",
        "#eee8aa":"palegoldenrod","#98fb98":"palegreen","#afeeee":"paleturquoise","#d87093":"palevioletred",
        "#ffefd5":"papayawhip","#ffdab9":"peachpuff","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum",
        "#b0e0e6":"powderblue","#800080":"purple","#663399":"rebeccapurple","#ff0000":"red","#bc8f8f":"rosybrown",
        "#4169e1":"royalblue","#8b4513":"saddlebrown","#fa8072":"salmon","#f4a460":"sandybrown","#2e8b57":"seagreen",
        "#fff5ee":"seashell","#a0522d":"sienna","#c0c0c0":"silver","#87ceeb":"skyblue","#6a5acd":"slateblue",
        "#708090":"slategray","#fffafa":"snow","#00ff7f":"springgreen","#4682b4":"steelblue","#d2b48c":"tan",
        "#008080":"teal","#d8bfd8":"thistle","#ff6347":"tomato","#40e0d0":"turquoise","#ee82ee":"violet",
        "#f5deb3":"wheat","#ffffff":"white","#f5f5f5":"whitesmoke","#ffff00":"yellow","#9acd32":"yellowgreen"};
    if(!color.startsWith('#')) color = '#' + color;
    if (typeof colors[color.toLowerCase()] !== 'undefined') return colors[color.toLowerCase()];
    else return "none";
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

    return (lum1 >= lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)).toFixed(2);
}

function init() {
    lightnessFactor1 = 0;
    lightnessFactor2 = 0;
}

init();

document.getElementById('contrastSlider1').addEventListener('input', function(){
    lightnessFactor1 = translate(document.getElementById('contrastSlider1').value, -127, 127, -1, 1);
});

document.getElementById('contrastSlider2').addEventListener('input', function(){
    lightnessFactor2 = translate(document.getElementById('contrastSlider2').value, -127, 127, -1, 1);
});

document.getElementById('backgroundInput').addEventListener('input', function(){
    document.getElementById('contrastSlider1').value = 0;
});

document.getElementById('textInput').addEventListener('input', function(){
    document.getElementById('contrastSlider2').value = 0;
});

document.getElementById('complianceButton').addEventListener('input', function(){
    makeCompliant(colorNameToHex(document.getElementById('backgroundInput').value),
        colorNameToHex(document.getElementById('textInput').value));
});

document.getElementById('mainDiv').addEventListener('input', function(){
    color1 = shadeColor(colorNameToHex(document.getElementById('backgroundInput').value), lightnessFactor1);
    color2 = shadeColor(colorNameToHex(document.getElementById('textInput').value), lightnessFactor2);
    contrastRatio = calcContrastRatio(color1, color2);
    document.getElementById('textbg1').style.backgroundColor = color1;
    document.getElementById('textbg1').style.color = color2;
    document.getElementById('textbg3').style.backgroundColor = color1;
    document.getElementById('textbg3').style.color = color2;
    document.getElementById('textbg2').style.backgroundColor = color2;
    document.getElementById('textbg2').style.color = color1;
    document.getElementById('textbg4').style.backgroundColor = color2;
    document.getElementById('textbg4').style.color = color1;

    document.getElementById('luminance1').innerHTML = calcLuminance(hexToRgb(colorNameToHex(color1))).toFixed(4);
    document.getElementById('luminance2').innerHTML = calcLuminance(hexToRgb(colorNameToHex(color2))).toFixed(4);

    document.getElementById('name1').innerHTML = hexToColorName(color1);
    document.getElementById('name2').innerHTML = hexToColorName(color2);

    document.getElementById('hex1').innerHTML = colorNameToHex(color1);
    document.getElementById('hex2').innerHTML = colorNameToHex(color2);

    document.getElementById('rgb1').innerHTML = hexToRgb(colorNameToHex(color1));
    document.getElementById('rgb2').innerHTML = hexToRgb(colorNameToHex(color2));

    document.getElementById('contrastRatio').innerHTML = "Contrast ratio: " + contrastRatio;

    document.getElementById('largeAA').innerHTML = wcagCompliant(contrastRatio, "AA", "large")[0];
    document.getElementById('largeAA').style.backgroundColor = wcagCompliant(contrastRatio, "AA", "large")[1];
    document.getElementById('largeAAA').innerHTML = wcagCompliant(contrastRatio, "AAA", "large")[0];
    document.getElementById('largeAAA').style.backgroundColor = wcagCompliant(contrastRatio, "AAA", "large")[1];
    document.getElementById('normalAA').innerHTML = wcagCompliant(contrastRatio, "AA", "normal")[0];
    document.getElementById('normalAA').style.backgroundColor = wcagCompliant(contrastRatio, "AA", "normal")[1];
    document.getElementById('normalAAA').innerHTML = wcagCompliant(contrastRatio, "AAA", "normal")[0];
    document.getElementById('normalAAA').style.backgroundColor = wcagCompliant(contrastRatio, "AAA", "normal")[1];
});
