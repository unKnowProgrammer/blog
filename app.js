const http = require("http");
const fs = require('fs');
const posts = require('./posts.js');
const markdown = require('markdown-js')

for(var i = 0; i<posts.length; i++){
	if (posts[i].md == undefined) {
	}
	else{
		for(var i = 0; i<posts.length; i++){
			posts[i].content = markdown.makeHtml(
				fs.readFileSync("./src/"+posts[i].md+".md","utf8")
			);
	
		}
	}
}



//console.log(posts);

http.createServer((request,response)=>{

	var blogStyle = fs.readFileSync("./style/blogstyle.css");
	var blogContentStyle = fs.readFileSync("./style/blogcontentstyle.css","utf8");



	const homePage = fs.readFileSync("./page-nav/index.html","utf8");
	const about = fs.readFileSync("./page-nav/about.html","utf8");


	var blog;

	//var header = fs.readFileSync('./page-parts/header.html','utf8');

	for(var j = 0; j<posts.length; j++){
		if(request.url == posts[j].blogURL){
			blog = true;
			break;
		}
	}

	
		if(blog){
			for(var i = 0; i<posts.length; i++){
				if(request.url == posts[i].blogURL){
					//response.writeHead(200,{"Content-Type" : "text/html"})
					response.write(`
					<html>
					<head>
						<title>${posts[i].title}</title>
						<meta charset = "utf-8"> 
						<meta name = "viewport" content = "width = device-width , user-scalable = no">
						<meta name = "theme-color" content = "black">
						<style>
							${blogContentStyle}
							
						</style>
					</head>
					<body>
					<header>
					<div id = "name"> FURKAN <br/> BLOG </div>
					<nav>
						<a href = "https://www.instagram.com/furkan_gologlu/?hl=tr" target = "_blank">Instagram</a>
						<a href = "#">Twitter</a>
					</nav>
					</header>
						<div class="container">
							<article>
								<div id = "article-title">${posts[i].subTitle}</div>
								<div id = "article-content">${posts[i].content}</div>
							</article>
							<div id= "comment">
								<form name = "comment" method="POST" action = "./send.php" onsubmit = "submit();">
									<h2><u>YORUM YAP</u> </h2><br/><b/>
									<div>
										<label>İsminiz: </label><br/>
										<input type="text" name = "username" maxlength="100" spellcheck="false" required="true"><br/><br/>
									</div>
									<div>
										<label>E - Mail : </label><br/>
										<input type="email" name="email" maxlength="200" spellcheck="false" required="true"><br/><br/>
									</div>
									<div>
										<label>Yaş : </label><br/>
										<input type="text" maxlength="3" name="age" spellcheck="false" required="true"><br/><br/>
									</div>
									<div>
										<label>YORUM : </label><br/><br/>
										<textarea maxlength="65525" name="comment" spellcheck="false" required="true"></textarea>
									</div><br/><br/>
									<input type="submit" name="" id = "submit">&nbsp;&nbsp;
									<input type="reset" name="" id = "reset">
								</form>
							</div>
						</div>
					</body>
					</html>`)

				}
			}
		}

			

		else if(request.url == "/"){
			response.write(`
			<html>
			<head>
				<title>BLOG</title>
				<style>${blogStyle}</style>
				<meta name = "viewport" content = "width=device-width user-scalable=no">
				<meta name = "theme-color" content = "black"><meta charset="utf-8">
			</head>

			<body>
				<header>
				<div id = "name"> FURKAN <br/> BLOG </div>
					<nav>
						<a href = "https://www.instagram.com/furkan_gologlu/?hl=tr" target = "_blank">Instagram</a>
						<a href = "#">Twitter</a>
					</nav>
				</header>
				<div id = "posts">`)	

			posts.forEach((post) => {
					response.write(`

					<div id = "post">
						<a href = "${post.blogURL}" id = "title">${post.subTitle}</a>
						<div id = "description">${post.description}</div>
						<div id = "date">${post.date}</div>
					</div>`);

				})
			response.write('</div></body></html>');
		}
	
		

		else if (request.url == "/about") {
			response.write(about);
		}









	response.end();

	}).listen(process.env.PORT);