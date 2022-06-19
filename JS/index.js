var submit = document.getElementById('submit')
var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var markContainer;
var currentIndex;

if (localStorage.getItem("marks")==null) {
    markContainer=[];
} else {
    markContainer = JSON.parse(localStorage.getItem('marks'))
    displayMarker(markContainer);
}

function addMark()
{
    var mark = 
    {
        name:siteName.value,
        url:siteUrl.value
    }

    if (submit.innerHTML=='Submit') 
    {
    markContainer.push(mark);
    localStorage.setItem("marks",JSON.stringify(markContainer))
     } else {
        //update
        markContainer[currentIndex].name=mark.name
        markContainer[currentIndex].url=mark.url
        localStorage.setItem("marks",JSON.stringify(markContainer))
        window.location.reload()
    }
  
       
        displayMarker(markContainer);
        clearForm();  
      

    // checkName(checkIndex);
    
}



function displayMarker(markList)
{
    var tableRow=``;
for (var i=0; i<markList.length ; i++)
{
    tableRow +=`<tr  class="mark-row ">
                        
    <td class=" mark-container p-4 w-25 border-bottom-0">${markList[i].name}</td>
    <td class=" p-4 btn-container border-bottom-0">
    <a  href="${markList[i].url}" class="btn btn-primary btn-visit" id="visitLink" target="_blank" href="#">visit</a>
    </td>
    <td class=" p-4 btn-container border-bottom-0">
    <button onclick="updateMark(${i})" class="btn btn-warning btn-update">update</button>
    </td>
    <td class=" p-4 btn-container border-bottom-0">
    <button onclick="deleteMark(${i})" class="btn btn-delete">Delete</button>
    </td>

  </tr>`
}
document.getElementById('rows').innerHTML = tableRow;
}

function clearForm()
{
    siteName.value='';
    siteUrl.value='';
}

function searchMark(term)
{
    var searchedMarks=[]
    for(var i=0;i<markContainer.length;i++)
    {
        if (markContainer[i].name.toLowerCase().includes(term.toLowerCase())==true) {
            searchedMarks.push(markContainer[i])
        } 
       displayMarker(searchedMarks)

    }
}
function deleteMark(markIndex)
{
    markContainer.splice(markIndex,1);
    localStorage.setItem('marks',JSON.stringify(markContainer));
    displayMarker(markContainer);
}


function updateMark(index)
{
currentIndex = index;
var mark = markContainer[index];
siteName.value= markContainer[index].name;
siteUrl.value = markContainer[index].url;
submit.innerHTML='update mark'
}

function isNameValid() {

    var nameRejex = /^[A-Za-z_]{1,}$/

    if (nameRejex.test(siteName.value)) {
        return true;
    } else {
        return false;
    }
}

// var urlRejex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
var urlRejex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

function isUrlValid() {
    if (urlRejex.test(siteUrl.value)) {
        return true
    } else {
        return false
    }
}


siteName.onkeyup = function()
{
    if (isNameValid() && isUrlValid() ) {
        submit.removeAttribute("disabled")
    } else {
        submit.disabled='true'
    }
}

siteUrl.onkeyup = function(){
    if (isNameValid() && isUrlValid() ) {
        submit.removeAttribute("disabled")
    } else {
        submit.disabled='true'
    }
}


