function enable3D() {
    var checkbox = document.getElementById("threeCheckbox")
    var threeWindow = document.getElementById("threeBlanket)")
    var keyBox = document.getElementById("keybox")
    var blankets = document.getElementById("blankets")

    if (checkbox.checked == true) {
        threeBlanket.style.display = "block"
        keyBox.style.display = "none"
        blankets.style.display = "none"
    }
    else {
        threeBlanket.style.display = "none"
        keyBox.style.display = "block"
        blankets.style.display = "block"
    }
}  