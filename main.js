function start() {
	if(window.localStorage.footerNoticeClosed) document.getElementsByTagName("footer")[0].remove();
	buildItemsList();
}

let allItems;

function buildItemsList() {

	fetch("items.json").then(r => r.json()).then(items => {

		const plugins = document.getElementsByClassName("divider plugins")[0];

		const insertFlags = (item, flags) => {
			if(item.flags.new) flags.insertAdjacentHTML("beforeend", `<span class="material-icons item-flag has-tooltip" data-tooltip="New: recently added">fiber_new</span>`);
			if(item.flags.requested) flags.insertAdjacentHTML("beforeend", `<span class="material-icons item-flag has-tooltip" data-tooltip="${item.requester ? "Requested by: " + item.requester : "Requested"}">insert_comment</span>`);
			if(item.flags.unstable) flags.insertAdjacentHTML("beforeend", `<span class="material-icons item-flag has-tooltip" data-tooltip="Unstable: many bugs may be present">bug_report</span>`);
			if(item.flags.unfinished) flags.insertAdjacentHTML("beforeend", `<span class="material-icons item-flag has-tooltip" data-tooltip="Unfinished: many problems may be present">warning</span>`);
			if(item.flags.deprecated) flags.insertAdjacentHTML("beforeend", `<span class="material-icons item-flag has-tooltip" data-tooltip="Deprecated: will be deleted soon">thumb_down</span>`);
		};

		for(let i = items.plugins.length - 1; i > -1; i--) {
			const item = items.plugins[i];
			let element = document.createElement("div");
			element.classList.add("item", "plugin");
			element.innerHTML = `
				<div class="item-name">${item.name}</div>
				<div class="item-flags"></div>
				<div class="item-description">${item.description}</div>
				<div class="item-action-buttons">
					<span class="material-icons item-action-button has-tooltip" data-tooltip="More info">more_horiz</span>
					<a class="material-icons item-action-button has-tooltip" data-tooltip="GitHub source" href="${item.source}">code</a>
					<a class="material-icons item-action-button has-tooltip" data-tooltip="Download" onclick="window.open('https://betterdiscord.net/ghdl/?url=${item.source}');">get_app</a>
				</div>
				<span class="item-idx-label">#${i + 1}</span>
			`;
			element.dataset.name = item.name;
			element.dataset.idx = i + 1;
			let actionButtons = element.getElementsByClassName("item-action-button"), actionTooltip = element.getElementsByClassName("item-action-tooltip")[0];
			actionButtons[0].onclick = () => openPop(item, "plugin");
			insertFlags(item, element.getElementsByClassName("item-flags")[0]);
			plugins.appendChild(element);
		}

		let themes = document.getElementsByClassName("divider themes")[0];

		for(let i = items.themes.length - 1; i > -1; i--) {
			const item = items.themes[i];
			let element = document.createElement("div");
			element.classList.add("item", "theme");
			element.innerHTML = `
				<div class="item-name">${item.name}</div>
				<div class="item-flags"></div>
				<div class="item-description">${item.description}</div>
				<div class="item-action-buttons">
					<span class="material-icons item-action-button has-tooltip" data-tooltip="More info">more_horiz</span>
					<a class="material-icons item-action-button has-tooltip" data-tooltip="GitHub source" href="${item.source}">code</a>
					<a class="material-icons item-action-button has-tooltip" data-tooltip="Download" onclick="window.open('https://betterdiscord.net/ghdl/?url=${item.source}');">get_app</a>
				</div>
				<span class="item-idx-label">#${i + 1}</span>
			`;
			element.dataset.name = item.name;
			element.dataset.idx = i + 1;
			let actionButtons = element.getElementsByClassName("item-action-button"), actionTooltip = element.getElementsByClassName("item-action-tooltip")[0];
			actionButtons[0].onclick = () => openPop(item, "theme");
			insertFlags(item, element.getElementsByClassName("item-flags")[0]);
			themes.appendChild(element);
		}

		let snippets = document.getElementsByClassName("divider css-snippet")[0];

		for(let i = items.cssSnippets.length - 1; i > -1; i--) {
			const item = items.cssSnippets[i];
			let element = document.createElement("div");
			element.classList.add("item", "css-snippet");
			element.innerHTML = `
				<div class="item-name">${item.name}</div>
				<div class="item-flags"></div>
				<div class="item-description">${item.description}</div>
				<div class="item-action-buttons">
					<span class="material-icons item-action-button has-tooltip" data-tooltip="More info">more_horiz</span>
					<span class="material-icons item-action-button has-tooltip" data-tooltip="Reveal code">code</span>
					<span class="material-icons item-action-button has-tooltip" data-tooltip="Download as theme">get_app</span>
				</div>
				<span class="item-idx-label">#${i + 1}</span>
			`;
			element.dataset.name = item.name;
			element.dataset.idx = i + 1;
			let actionButtons = element.getElementsByClassName("item-action-button"), actionTooltip = element.getElementsByClassName("item-action-tooltip")[0];
			actionButtons[0].onclick = () => openPop(item, "css-snippet");
			actionButtons[1].onclick = () => fetch("./css-snippets/" + item.filename).then(d => d.text()).then(code => {
				const desc = element.getElementsByClassName("item-description")[0];
				desc.innerText = code;
				desc.classList.add("select");
			});
			actionButtons[2].onclick = () => fetch("./css-snippets/" + item.filename).then(d => d.text()).then(code => {
				window.saveAs(new Blob([`//META{"name":"${item.filename.split(".")[0]}","description":"${item.description}","author":"Metalloriff","version":"1.0"}*//\n${code}`], { type : "text/css" }), item.filename);
			})
			insertFlags(item, element.getElementsByClassName("item-flags")[0]);
			snippets.appendChild(element);
		}

		let bots = document.getElementsByClassName("divider bots")[0];

		for(let i = items.bots.length - 1; i > -1; i--) {
			const item = items.bots[i];
			let element = document.createElement("div");
			element.classList.add("item", "bot");
			element.innerHTML = `
				<div class="item-name">${item.name}</div>
				<div class="item-flags"></div>
				<div class="item-description">${item.description}</div>
				<div class="item-action-buttons">
					<span class="material-icons item-action-button has-tooltip" data-tooltip="More info">more_horiz</span>
					<a class="material-icons item-action-button has-tooltip" data-tooltip="GitHub source" href="${item.source}">insert_link</a>
					<a class="material-icons item-action-button has-tooltip" data-tooltip="Get invite" href="${item.inviteLink}">person_add</a>
				</div>
				<span class="item-idx-label">#${i + 1}</span>
			`;
			element.dataset.name = item.name;
			element.dataset.idx = i + 1;
			let actionButtons = element.getElementsByClassName("item-action-button"), actionTooltip = element.getElementsByClassName("item-action-tooltip")[0];
			actionButtons[0].onclick = () => openPop(item, "bot");
			insertFlags(item, element.getElementsByClassName("item-flags")[0]);
			bots.appendChild(element);
		}

		let tooltipItems = document.getElementsByClassName("has-tooltip");

		for(let i = 0; i < tooltipItems.length; i++) {
			attachTooltip(tooltipItems[i].dataset.tooltip, tooltipItems[i]);
		}

		allItems = document.getElementsByClassName("item");

		ready();

	});

}

let hideHeaderButtonsTimeout;

function ready() {
	hideHeaderButtonsTimeout = setTimeout(() => document.getElementsByClassName("header-buttons")[0].style.transform = "", 1500);
	const args = (window.location.href.split("?")[1] || "").split("&");
	for(let i = 0; i < args.length; i++) {
		let variable = args[i].split("=")[0], value = args[i].split("=")[1];
		if(!variable && !value) continue;
		value = value.split("-").join(" ");
		if(variable == "plugin" || variable == "theme" || variable == "bot" || variable == "css-snippet") {
			const field = document.getElementById("filter-bar");
			field.value = value;
			updateSearchFilter(value);
			for(let a = 0; a < allItems.length; a++) if(!allItems[a].classList.contains(variable)) allItems[a].classList.add("filtered-out");
			if(document.getElementsByClassName("item").length) document.querySelector(".item:not(.filtered-out)").getElementsByClassName("item-action-button")[0].click();
		}
	}
}

function attachTooltip(text, element) {
	let tooltip;
	element.addEventListener("mouseover", () => {
		tooltip = document.createElement("div");
		tooltip.classList.add("tooltip");
		tooltip.innerText = text;
		element.appendChild(tooltip);
		tooltip.style.bottom = element.offsetHeight + "px";
		tooltip.style.left = (((element.offsetWidth / 2) - (tooltip.offsetWidth / 2)) - (element.parentElement.firstElementChild.getBoundingClientRect().left - element.getBoundingClientRect().left)) + "px";
	});
	element.addEventListener("mouseleave", () => {
		if(tooltip) tooltip.remove();
	});
}

function openPop(item, type) {
	document.getElementsByClassName("header-buttons")[0].style.display = "none";
	document.getElementsByTagName("header")[0].style.zIndex = "0";
	document.body.insertAdjacentHTML("beforeend", `
		<div class="item-popout">
			<div class="backdrop"></div>
			<div id="item-popout-window" class="window ${type}">
				<span class="popout-label">${item.name}</span>
				<span class="material-icons close-button">close</span>
				<div class="popout-label" style="margin-top:20px;">${item.description}</div>
				${type == "plugin" ? `<div id="popout-item-version" class="popout-label" style="margin-top:50px;">Fetching version...</div>` : ""}
				<div class="popout-label" style="margin-top:20px;">${item.note ? "Note: " + item.note : ""}</div>
				<div class="popout-label popout-button" style="margin-top:50px;" onclick="window.open('${item.source}');">Source</div>
				<div class="popout-label popout-button" onclick="window.open('https://betterdiscord.net/ghdl/?url=${item.source}');">Download</div>
				<div class="preview-images" style="margin-top:-5px">
					<div class="popout-label" style="position:absolute;top:-25px;">Fetching previews...</div>
					<div class="scroll-wrapper"><div class="scroller" data-simplebar></div></div>
				</div>
			</div>
		</div>
	`);
	const window = document.getElementById("item-popout-window"), previewLabel = window.getElementsByClassName("preview-images")[0].getElementsByClassName("popout-label")[0], popout = window.parentElement;
	popout.lastElementChild.style.animation = "zoom-in 0.5s";
	popout.style.animation = "fade-in 0.5s";
	setTimeout(() => {
		popout.lastElementChild.style.animation = "";
		popout.style.animation = "";
	}, 500);
	const close = () => {
		popout.lastElementChild.style.animation = "zoom-in 0.2s reverse";
		popout.style.animation = "fade-in 0.2s reverse";
		setTimeout(() => {
			popout.remove();
			document.getElementsByClassName("header-buttons")[0].style.display = "";
			document.getElementsByTagName("header")[0].style.zIndex = "2";
		}, 200);	
	};
	window.getElementsByClassName("close-button")[0].onclick = close;
	popout.firstElementChild.onclick = close;
	let imageFailTimeout;
	if(item.preview) imageFailTimeout = setTimeout(() => {
		previewLabel.innerText = "Failed to fetch image previews";
	}, 5000);
	else previewLabel.innerText = "No previews";
	if(item.source && type == "plugin") fetch(item.source.replace("github.com", "rawgit.com").replace("/blob", "")).then(r => r.text()).then(data => {
		const version = data.substring(data.indexOf("getVersion"), data.length).match(/"[0-9].[0-9].[0-9]"/)[0].split("\"").join("");
		document.getElementById("popout-item-version").innerText = "Version: v" + version;
	});
	const appendPreviewImage = (url, i) => {
		switch(url.split(".")[url.split(".").length - 1]) {
			case "png":
			case "jpg":
			case "jpeg":
			case "gif": {
				let img = document.createElement("div");
				img.classList.add("preview-image");
				img.style.backgroundImage = "url(" + url + ")";
				img.addEventListener("click", () => openImagePreview(url));
				window.getElementsByClassName("simplebar-content")[0].appendChild(img);
				previewLabel.innerText = "Previews (" + (i + 1) + ")";
				break;
			}
			case "mp4": {
				let vid = document.createElement("div");
				vid.classList.add("preview-image");
				vid.innerHTML = `<div class="material-icons play-button">play_circle_filled_white</div>`;
				vid.addEventListener("click", () => openVideoPreview(url));
				window.getElementsByClassName("simplebar-content")[0].appendChild(vid);
				previewLabel.innerText = "Previews (" + (i + 1) + ")";
				break;
			}
		}
	};
	if(item.preview) {
		fetch(item.preview + "README.md").then(r => r.text()).then(data => {
			previewLabel.style.top = "-15px";
			const images = Array.filter(data.split("(").join(")").split(")"), i => i.indexOf(".") != -1);
			for(let i = 0; i < images.length; i++) {
				clearTimeout(imageFailTimeout);
				appendPreviewImage(item.preview + images[i], i);
			}
		});
	}
	if(item.previews) {
		setTimeout(() => {
			for(let i = 0; i < item.previews.length; i++) {
				appendPreviewImage(item.previews[i], i);
			}
		}, 0);
	}
}

function openImagePreview(url) {
	document.body.insertAdjacentHTML("beforeend", `
		<div class="image-popout">
			<div class="backdrop"></div>
			<div class="window" style="height:${window.innerHeight / 1.2}px;">
				<span class="material-icons close-button" style="position:absolute;right:0;" onclick="this.parentElement.parentElement.zoomFadeOut();">close</span>

			</div>
		</div>
	`);
	const img = new Image();
	img.src = url;
	img.style.width = "auto";
	img.style.height = "100%";
	img.style.borderRadius = "5px";
	const popout = document.getElementsByClassName("image-popout")[0];
	popout.lastElementChild.style.animation = "zoom-in 0.5s";
	popout.style.animation = "fade-in 0.5s";
	setTimeout(() => {
		popout.lastElementChild.style.animation = "";
		popout.style.animation = "";
	}, 500);
	const close = () => {
		popout.lastElementChild.style.animation = "zoom-in 0.2s reverse";
		popout.style.animation = "fade-in 0.2s reverse";
		setTimeout(() => popout.remove(), 200);	
	};
	popout.lastElementChild.appendChild(img);
	(async function(){
		while(img.offsetWidth > window.innerWidth / 1.2) {
			if(img.style.width == "auto") img.style.width = img.offsetWidth + "px";
			img.style.width = (img.offsetWidth / 1.2) + "px";
			img.style.height = (img.offsetHeight / 1.2) + "px";
			img.parentElement.style.marginLeft = -(img.offsetWidth / 2) + "px";
			img.parentElement.style.marginTop = -(img.offsetHeight / 2) + "px";
			await new Promise(p => setTimeout(p, 10));
		}
	})();
	img.parentElement.style.marginLeft = -(img.offsetWidth / 2) + "px";
	img.parentElement.style.marginTop = -(img.offsetHeight / 2) + "px";
	popout.getElementsByClassName("backdrop")[0].onclick = close;
	popout.getElementsByClassName("close-button")[0].onclick = close;
}

function openVideoPreview(url) {
	document.body.insertAdjacentHTML("beforeend", `
		<div class="image-popout">
			<div class="backdrop"></div>
			<div class="window" style="height:${window.innerHeight / 1.2}px;">
				<span class="material-icons close-button" style="position:absolute;right:0;" onclick="this.parentElement.parentElement.zoomFadeOut();">close</span>

			</div>
		</div>
	`);
	const vid = document.createElement("video"), src = document.createElement("source");
	vid.style.width = "auto";
	vid.style.height = "100%";
	src.src = url;
	src.type = "video/mp4";
	vid.autoplay = true;
	vid.loop = true;
	vid.controls = true;
	vid.appendChild(src);
	const popout = document.getElementsByClassName("image-popout")[0];
	popout.lastElementChild.style.animation = "zoom-in 0.5s";
	popout.style.animation = "fade-in 0.5s";
	setTimeout(() => {
		popout.lastElementChild.style.animation = "";
		popout.style.animation = "";
	}, 500);
	const close = () => {
		popout.lastElementChild.style.animation = "zoom-in 0.2s reverse";
		popout.style.animation = "fade-in 0.2s reverse";
		setTimeout(() => popout.remove(), 200);	
	};
	popout.lastElementChild.appendChild(vid);
	vid.onloadedmetadata = async function(){
		while(vid.offsetWidth > window.innerWidth / 1.2) {
			if(vid.style.width == "auto") vid.style.width = vid.offsetWidth + "px";
			vid.style.width = (vid.offsetWidth / 1.2) + "px";
			vid.style.height = (vid.offsetHeight / 1.2) + "px";
			vid.parentElement.style.marginLeft = -(vid.offsetWidth / 2) + "px";
			vid.parentElement.style.marginTop = -(vid.offsetHeight / 2) + "px";
			await new Promise(p => setTimeout(p, 10));
		}
	};
	popout.getElementsByClassName("backdrop")[0].onclick = close;
	popout.getElementsByClassName("close-button")[0].onclick = close;
}

function updateSearchFilter(filter) {
	for(let i = 0; i < allItems.length; i++) {
		switch(true) {
			case filter.trim()[0] == "#": {
				if(allItems[i].dataset.idx == filter.replace(/[^0-9]/g, "")) allItems[i].classList.remove("filtered-out");
				else allItems[i].classList.add("filtered-out");
				break;
			}
			default: {
				if(allItems[i].dataset.name.toLowerCase().includes(filter.toLowerCase())) allItems[i].classList.remove("filtered-out");
				else allItems[i].classList.add("filtered-out");
			}
		}
	}
}