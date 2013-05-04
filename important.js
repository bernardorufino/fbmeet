//Remember

create_event()
//Saindo do home, clicar em eventos
$('div:contains(\"Events\").linkWrap.hasCount').click();

//Da página de eventos, clicar em criar evento
$("span:contains('Create Event').uiButtonText").click();

//Change name of the event to whatever
$("input.inputtext.eventTitle#u_a_3").val("Nome do evento");

//Change the details
$("textarea.uiTextareaNoResize.eventDetails#u_a_4").val("Detalhes aqui, meu chapa!");

//Change the location
$("input.inputtext.textInput#u_a_5").val("Localização");

//Change due date
$("input[name='when_dateIntlDisplay']").val("01/01/2012");

//Change due time
$("input[name='when_time_display_time']").val("11:10");

//Click ok button;
$("button._42ft._42fu.layerConfirm.uiOverlayButton._42g-").click();