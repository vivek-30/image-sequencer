document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('theme-toggler').addEventListener('change',function() {

        document.querySelector('body').classList.toggle('dark-theme');
        document.querySelector('.name-header').classList.toggle('dark-theme');

        document.querySelectorAll('h2').forEach(function(heading) {
            heading.classList.toggle('dark-theme');
        });

        document.querySelector('header').classList.toggle('dark-theme-spec');
        document.querySelector('#dropzone-text i').classList.toggle('dark-theme-spec');
        document.querySelector('.text-muted').classList.toggle('dark-theme-spec');

        document.querySelector('div.panel-body').classList.toggle('dark-theme');
        document.querySelector('input[type="file"]').classList.toggle('dark-theme-spec');

        if(document.getElementById('version-number-top-right').className.indexOf('dark-theme-spec') == -1){

            document.getElementById('version-number-top-right').style.color = '#fff';
            document.getElementById('update-prompt-modal').style.backgroundColor = '#fff';
            document.getElementById('update-prompt-modal').style.color = '#000';
            document.getElementById('version-number-text').style.color = '#fff';
            document.querySelector('#move-up i').style.color = '#fff';
        }
        else{
            document.getElementById('version-number-top-right').style.color = 'gray';
            document.getElementById('update-prompt-modal').style.backgroundColor = '#000';
            document.getElementById('update-prompt-modal').style.color = '#fff';
            document.getElementById('version-number-text').style.color = 'gray';
            document.querySelector('#move-up i').style.color = '#808080';
        }

        document.getElementById('version-number-top-right').classList.toggle('dark-theme-spec');
        document.getElementById('update-prompt-modal').classList.toggle('dark-theme-spec');
        document.getElementById('version-number-text').classList.toggle('dark-theme-spec');
        document.querySelector('#move-up i').classList.toggle('dark-theme-spec');
    });
});
