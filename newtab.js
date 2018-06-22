(async () => {
  // Check daily for new image
	browser.alarms.onAlarm.addListener(update);
	browser.alarms.create('daily', { periodInMinutes: 24 * 60 });

  // Fire immediately after install/startup
  await update();
})();

async function update() {
	let url = 'https://apod.nasa.gov/apod/astropix.html';
  let resp = await fetch(url);
  let text = await resp.text();
  let matches = new RegExp('SRC="(.*)"').exec(text);
  if (matches.length == 2) {
	  let image = 'https://apod.nasa.gov/apod/' + matches[1];
    let resp = await fetch(image);
    let blob = await resp.blob();
    let uri = URL.createObjectURL(blob);
    var reader  = new FileReader();
    reader.addEventListener("load", function () {
      document.body.style.backgroundImage = 'url("' + reader.result + '")';
    }, false);
    reader.readAsDataURL(blob);
  }
}
