(function () {
    // CodeMirror init
    var editor = CodeMirror.fromTextArea(document.getElementById('text'), {
        mode: 'gfm',
        lineNumbers: true,
        theme: "default",
        autofocus: true,
        lineWrapping: "warp",
        scrollbarStyle: "simple" // overlay
    })

    function preview() {
        document.getElementById('preview').innerHTML = marked(editor.getValue())
        let doms = document.getElementById('preview').getElementsByTagName('pre')
        for (let i = 0; i < doms.length; i++) {
            doms[i].className += 'language-javascript'
            doms[i].innerHTML = Prism.highlight(doms[i].innerText, Prism.languages.javascript)
        }
    }
    // keyup event
    editor.on('keyup', function (cm, e) {
            preview()
        })
        // scroll event
    editor.on('scroll', function (cm, e) {
            var scroll_info = cm.getScrollInfo()
            var scale = (scroll_info.top) / (scroll_info.height - scroll_info.clientHeight);

            document.getElementById('preview').scrollTop = document.getElementById('preview').scrollHeight * scale
        })
        // default Value
    editor.setValue(
        `GitHub Flavored Markdown
========================

Everything from markdown plus GFM features:

## URL autolinking

Underscores_are_allowed_between_words.

## Strikethrough text

GFM adds syntax to strikethrough text, which is missing from standard Markdown.

~~Mistaken text.~~
~~**works with other formatting**~~

~~spans across
lines~~

## Fenced code blocks (and syntax highlighting)

\`\`\`javascript
        for (var i = 0; i < items.length; i++) {
            console.log(items[i], i); // log them
        }
\`\`\`

## Task Lists

- [ ] Incomplete task list item
- [x] **Completed** task list item

## A bit of GitHub spice

* SHA: be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User@SHA ref: mojombo@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User/Project@SHA: mojombo/god@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* #Num: #1
* User/#Num: mojombo#1
* User/Project#Num: mojombo/god#1

See http://github.github.com/github-flavored-markdown/.
`)
    preview()
})()