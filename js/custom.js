$(document).ready(function () {
	var width = $(window).width();
	  if (width < 768) {
		$('.LeadsPanel h1').click(function(){
			$(this).toggleClass("up");
			$(".Leads").slideToggle();
		});
	  }
	
	$(".thumbnail figcaption").click(function(){
		$(this).parent().toggleClass("open");
	});
	
	$(".btn").click(function(event){
		event.stopPropagation();
	});
	
	
	/* Delear Registration */
		$(".RegTL .Registration").each(function(e) {
			if (e != 0)
				$(this).hide();
		});

		$(".next").click(function(){
			$(this.parentElement.parentElement).slideToggle();			
			$(this.parentElement.parentElement.previousElementSibling).find('h3').removeClass('active');
			$(this.parentElement.parentElement.parentElement).next().find('.Registration').slideToggle();			
			$(this.parentElement.parentElement.parentElement).next().find('h3').addClass('active');
		});

		$(".previous").click(function(){
			$(this.parentElement.parentElement).slideToggle();			
			$(this.parentElement.parentElement.previousElementSibling).find('h3').removeClass('active');
			$(this.parentElement.parentElement.parentElement.previousElementSibling).find('.Registration').slideToggle();			
			$(this.parentElement.parentElement.parentElement.previousElementSibling).find('h3').addClass('active');			
		});
	
	$(".LeftPanelToggle").click(function(){
		$(".container-fluid").toggleClass("Open");
	});
	
	$(".profile").click(function(){
		$(".profile .Dropdown").slideToggle();
		event.stopPropagation();
	});
	$("body").click(function(){
		$(".profile .Dropdown").slideUp();
		
	});
	$(".Dropdown").click(function(){
		event.stopPropagation();
	});
	
	// Login Tabs
	$(".Tabs a").click(function(e) {
      e.preventDefault();
      $('.form-group').hide();
      $('#' + $(this).data('rel')).show();
	  $(".Tabs a").removeClass("active");
	  $(this).addClass("active");
	});
	
	// Chat 
	$(".input-group-btn .User, .ChatWrapper .ChatProfile").click(function(e) {
      e.preventDefault();
      $('.ChatFlow').hide();
      $('#' + $(this).data('rel')).show();
	});
	
	$("#ChatMinimize").click(function(){
		$(this).toggleClass("glyphicon-resize-full");
		$(".ChatWrapper").toggleClass("Minimize");
	});
	
	$(".ChatFloatIcon").click(function(){
		$(".ChatToggle").addClass("Active");
		$(this).addClass("DeActive");
	});
	
	$("#ChatClose").click(function(){
		$(".ChatToggle").removeClass("Active");
		$(".ChatFloatIcon").removeClass("DeActive");
	});
	
	
});