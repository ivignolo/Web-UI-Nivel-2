/*
 * Contact Object
 */
function Contact(id, name, surname, phone, email){
	this.id = id;
	this.name = name;
	this.surname = surname;
	this.phone = phone;
	this.email = email;
}

/*
 * Array of contacts
 */
var contacts = new Array();

jQuery(document).ready(function(){
	getContacts();
})

/*
 * Get input from the form, create a Contact objects with this data, and save it into localStorage, also add it to array
 */
function getFormData(){
	var name = jQuery('#name').val();
	var surname = jQuery('#surname').val();
	var email = jQuery('#email').val();
	var phone = jQuery('#phone').val();
	
	var contact = new Contact(contacts.length, name, surname, phone, email);
	contacts.push(contact);
	addContactToList(contact);
	saveContact(contact);
}

/*
 * Save contact in localStorage
 */
function saveContact(contact){
	if(localStorage){
		var contactItem = JSON.stringify(contact);
		localStorage.setItem(contact.id, contactItem);
	}
	else{
		console.log("Local storage no encontrado")
	}
}

/*
 * Add all contacts in array into the <ul> element
 */
function addContactsToList() {
    var ul = jQuery('#contactList');
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < contacts.length; i++) {
        var contactitem = contacts[i];
		if(contactitem != undefined){
			var li = createNewLiItem(contactitem);
			listFragment.appendChild(li);
		}
    }
    ul.append(listFragment);
}

/*
 * Add Contact to the end of the <ul> element
 */
function addContactToList(contactItem) {
	var ul = jQuery('#contactList');
    var li = createNewLiItem(contactItem);
    ul.append(li);
    jQuery('#contactForm')[0].reset();
}

/*
 * Create new Contact <li> item for given contact object
 */
function createNewLiItem(contactitem) {
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.innerHTML =
		"<img src=\"images/contactImg.jpg\"/><br /><br />" +
		"<label for=\"name\">Nombre:</label> <input id=\"name" + contactitem.id + "\" type=\"text\" value="+ contactitem.name+ "> <br /> " +
        "<label for=\"surname\">Apellido:</label> <input id=\"surname" + contactitem.id + "\" type=\"text\" value="+ contactitem.surname+ "> <br /> " +
		"<label for=\"email\">Email:</label> <input id=\"email" + contactitem.id + "\" type=\"text\" value="+ contactitem.email+ "> <br /> " +
		"<label for=\"phone\">Telefono:</label> <input id=\"phone" + contactitem.id + "\" type=\"text\" value="+ contactitem.phone+ "> <br /> " +
		"<div><button type=\"button\" onclick=\"deleteContact(" + contactitem.id + ");\">Borrar</button> <button type=\"button\" onclick=\"editContact(" + contactitem.id + ");\">Guardar cambios</button></div>";

    li.appendChild(span);
    return li;
}

/*
 * Get all contacts from localStorage and add it to the list of contacts in the page
 */
function getContacts(){
	if(localStorage){
		for(var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var item = localStorage.getItem(key);
			var contactItem = JSON.parse(item);
			contacts[contactItem.id] = contactItem;
		}
		addContactsToList();
	}else{
		console.log("Local storage no encontrado")
	}
}

/*
 * Delete contact
 */
function deleteContact(contactId){
	localStorage.removeItem(contactId);
	delete contacts[contactId];
	jQuery('#contactList').html("");
	addContactsToList();
	showDeleteSuccessMessage();
}

/*
 * Edit contact
 */
function editContact(contactId){
	var item = localStorage.getItem(contactId);
	var contactItem = JSON.parse(item);
	
	//Update fields in object
	contactItem.name = jQuery("#name" + contactId).val();
	contactItem.surname = jQuery("#surname" + contactId).val();
	contactItem.email = jQuery("#email" + contactId).val();
	contactItem.phone = jQuery("#phone" + contactId).val();
	
	//Convert object to string and save in localStorage
	var modifiedItem = JSON.stringify(contactItem);
	localStorage.setItem(contactId,modifiedItem);
	showSuccessMessage();
}

function showSuccessMessage(){
	$('#msgPanelSuccess').show();
	$('#msgPanelError').hide();
	$('#msgPanelDeleteSuccess').hide();
}

function showErrorMessage(){
	$('#msgPanelError').show();
	$('#msgPanelSuccess').hide();
	$('#msgPanelDeleteSuccess').hide();
}

function showDeleteSuccessMessage(){
	$('#msgPanelDeleteSuccess').show();
	$('#msgPanelSuccess').hide();
	$('#msgPanelError').hide();
}

