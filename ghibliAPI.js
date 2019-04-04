var data = d3.json("https://ghibliapi.herokuapp.com/films");
data.then(function(data){
  console.log(data);
  makeTable(data);
}
,
function(err){
  console.log(err);
});



var makeTable = function(films)
{
  var directorList = getNumFilmsForEachDirector(films);


  var table = d3.select("body").append("table");
  var header = table.append("tr");
  header.append("td")
  .text("Film Name");
  header.append("td")
  .text("Director");
  header.append("td")
  .text("Release Year");

  var tableRows = table.selectAll("fas")
    .data(films)
    .enter()
    .append("tr");

    tableRows
    .append("td")
    .text(function(d){return d.title});

    tableRows
    .append("td")
      .text(function(d){return d.director});

    tableRows
    .append("td")
    .text(function(d){return d.release_date});


    var table2 = d3.select("body").append("table").classed("table2",true);
    var header = table2.append("tr");
    header.append("td")
    .text("Director");
    header.append("td")
    .text("Number of Films");


    var tableRows2 = table2.selectAll("sdwsr")
      .data(directorList)
      .enter()
      .append("tr");

      tableRows2
      .append("td")
      .text(function(d){return d.director});

      tableRows2
      .append("td")
        .text(function(d){return d.numFilms});

}



var getNumFilmsForEachDirector = function(films)
{
  listDirectors = [];
  films.forEach(function(d,i)
  {
    var inList=false;
    for (var index=0;index<listDirectors.length;index++)
    {
      if (listDirectors[index]==d.director)
      {
        inList = true;
      }
    }

    if (inList == false)
    {
      listDirectors.push(d.director);
    }
  })
  console.log(listDirectors);
  var listNumFilms=[];
  films.forEach(function(d,i)
  {
    var indexOfDirector = listDirectors.indexOf(d.director);
    var curNum = listNumFilms[indexOfDirector];
    if (curNum==undefined)
    {
      listNumFilms[indexOfDirector]=1;
    }
    else
    {
      listNumFilms[indexOfDirector]+=1;
    }
  })
  console.log(listNumFilms);
  listOfDirectorObjects=[];
  listDirectors.forEach(function(d,i)
  {
    var directObject = {
      director:d,
      numFilms:listNumFilms[i]
    }
    listOfDirectorObjects.push(directObject);
  })
  console.log(listOfDirectorObjects);
  return listOfDirectorObjects;
}
