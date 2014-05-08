(function($){

	var Contact = Backbone.Model.extend({
		defaults: function(){
			return{
				name : '',
				surname : '',
				phone : '',
				email : ''
			}
		}
	});

	var ContactList = Backbone.Collection.extend({
		model: Contact
	});

	var contacts = new ContactList();

	var ContactView = Backbone.View.extend({
		model : new Contact(),
		tagName : 'li',
		events: {
			'click .edit': 'edit',
			'click .delete': 'delete',
			'blur .name': 'close',
			'keypress .name': 'onEnterUpdate'
		},
		initialize: function(){
			this.template = _.template($('#contactTemplate').html());
		},
		edit: function(ev) {
			ev.preventDefault();
			this.$('.name').attr('contenteditable', true).focus();
		},
		close: function(ev) {
			var name = this.$('.name').text();
			this.model.set('name', name);
			this.$('.name').removeAttr('contenteditable');
		},
		onEnterUpdate: function(ev) {
			var self = this;
			if (ev.keyCode === 13) {
				this.close();
				_.delay(function() { self.$('.name').blur() }, 100);
			}
		},
		delete: function(ev) {
			ev.preventDefault();
			contacts.remove(this.model);
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var ContactsView = Backbone.View.extend({
		model : contacts,
		el: $('#contacts-container'),
		initialize: function () {
			this.model.on('add', this.render, this);
			this.model.on('remove', this.render, this);
		},
		render: function(){
			var self = this;
			self.$el.html('');
			_.each(this.model.toArray(), function(contact, i){
				self.$el.append((new ContactView({model: contact})).render().$el);
			});
			return this;
		}
	});

	$(document).ready(function(){
		$('#contactForm').submit(function(){
			var contact = new Contact({name: $('#name').val(), surname: $('#surname').val(), email: $('#email').val(), phone: $('#phone').val()});
			contacts.add(contact);
			console.log(contacts.toJSON());
			return false;
		});
		var appView = new ContactsView();
	});

})(jQuery);

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