if ( !('boxShadow' in document.body.style) )
{
    document.body.setAttribute('class', 'noBoxShadow');
}

document.body.addEventListener("click", function (e) {
    var target = e.target;
    if ( target.tagName === "INPUT" &&
        target.getAttribute('class').indexOf('liga') === -1 )
    {
        target.select();
    }
}, {passive: true});

(function () {
    var fontSize = document.getElementById('fontSize'),
        testDrive = document.getElementById('testDrive'),
        testText = document.getElementById('testText');

    function updateTest()
    {
        testDrive.innerHTML = testText.value || String.fromCharCode(160);
        if ( window.icomoonLiga )
        {
            window.icomoonLiga(testDrive);
        }
    }

    function updateSize()
    {
        testDrive.style.fontSize = fontSize.value + 'px';
    }

    fontSize.addEventListener('change', updateSize, {passive: true});
    testText.addEventListener('input', updateTest, {passive: true});
    testText.addEventListener('change', updateTest, {passive: true});
    updateSize();
}());
