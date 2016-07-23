(function() {

var Link = function(element, tabs) {
	this.element = element;
	this.tabs = tabs;
	// this.active = element.classList.contains('.active');
};

var Tab = function(element) {
	this.element = element;
	this.links = [];
	this.menu = document.querySelector('.tab-menu');
	this.tabsContent = document.querySelector('.tabs-content');
	var that = this;
	this.active = null;
	this.activeTab = null;

	Array.prototype.forEach.call(element.querySelectorAll('.tab-link'), function(linkElement) {
		var link = new Link(linkElement, that);
		if (linkElement.classList.contains('active')) {
			that.active = link;
		}
		that.links.push(link);
	});

	if (this.active == null) {
		this.active = this.links[0];
	}

	Array.prototype.forEach.call(this.links, function(link) {
		link.element.addEventListener('click', that.activate.bind(link));
	});

	this.activate.call(this.active);
};

Tab.prototype.activate = function() {
	if (this.tabs.activeTab) {
		this.tabs.activeTab.classList.remove('active');
	}
	this.tabs.active.element.classList.remove('active');

	var tabName = this.element.dataset.tab;
	var tab = document.getElementById(tabName);
	this.tabs.activeTab = tab;
	tab.classList.add('active');
	this.element.classList.add('active');
	this.tabs.active = this;
};

var tabsElements = document.querySelectorAll('.tabs');
var tabs = [];
Array.prototype.forEach.call(tabsElements, function(tab) {
	tabs.push(new Tab(tab));
});

})();