$(document).load(function () {
        $('.fh5co-loader').show();
    });
    $(document).ready(function(){
    $.ajaxSetup({
            cache: false
    });
});

var d = new Date(new Date().getTime() + 200 * 120 * 120 * 2000);

// default example
simplyCountdown('.simply-countdown-one', {
    year: 2024,
    month: 8,
    day: 10
    });


    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            const messageElement = document.getElementById('copyMessage');
            messageElement.style.display = 'block';
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 1000); // Hide after 2 seconds
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
        });
    }


$(document).ready(function() {
$('#myForm').on('submit', function(e) {
e.preventDefault();

var formData = {
  name: $('#name').val(),
  message: $('#message').val(),
  rsvp: $('#rsvp').val()
};
$('.form-loader').show();

$.ajax({
        url: '/comment',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        beforeSend: function() {
        $(".form-loader").show();
        },
        success: function(response) {
        $('#result').html('Form submitted successfully!');
        $('#myForm')[0].reset();
        $('#nameCount').text('0/8');
        $('#messageCount').text('0/150');
        fetchData(); // Assume this function loads and displays comments
        },
        error: function(error) {
        $('#result').html('Error submitting form: ' + error.responseJSON.error);
        },
        complete: function() {
        $(".form-loader").fadeOut("slow");
        }
    });
    });
function fetchData() {
        $.get("/comment", function(data) {
            if(data) {
                var html = '';
        for (let i = data.length - 1; i >= 0; i--) {
        let c;
        if (i % 2 == 0) {
            html += '<div class="col-12 comment  mt-4">';
            c = "color: black";
        } else {
            html += '<div class="col-12 darker mt-4">';
            c = "color: white;";
        }
        html += '<h4 style="' + c + 'font-size: 1em; margin: 0;">' + data[i].name + ' ' + '<span style="font-size: 0.7em;">' + data[i].rsvp + '</span></h4>';
        html += '<p style="font-size: 0.9em; margin-top: 5px;' + c +'">' + data[i].message + '</p>';
        html += '</div>';
        }
        $('#doa').html(html);
            } else {
                console.log("invalid data")
            }

}).fail(function() {
$('#doa').html('Error fetching data.');
});
}
fetchData();
});

// count
$('#name').on('input', function() {
    var remaining = 0 + $(this).val().length;
    $('#nameCount').text(remaining + '/8');
  });

  $('#message').on('input', function() {
    var remaining = 0 + $(this).val().length;
    $('#messageCount').text(remaining + '/150');
  });


  const playPauseButton = document.getElementById('playSound');
        const audio = document.getElementById('audio');
        const icon = playPauseButton.querySelector('i');

        function togglePlayPause() {
        if (audio.paused) {
        audio.play();
        icon.classList.remove('icon-play');
        icon.classList.add('icon-pause');
        } else {
        audio.pause();
        icon.classList.remove('icon-pause');
        icon.classList.add('icon-play');
        }
        }

        playPauseButton.addEventListener('click', togglePlayPause);

        document.addEventListener('DOMContentLoaded', function() {
            const revealButton = document.getElementById('revealButton');
            const sectionOpen = document.getElementById('section-open');
            const sectionMain = document.getElementById('section-main');
            
            
            revealButton.addEventListener('click', function() {
            sectionOpen.classList.add('hidden');
            sectionMain.classList.remove('hidden');
            togglePlayPause()

            AOS.init();
        });


});

            var url = new URL(window.location.href);
            var to = url.searchParams.get("to");
            if (to) {
                document.getElementById("untuk").innerHTML = to.toUpperCase();
				
			}






