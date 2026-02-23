<script lang="ts">
    export let showPlayer: () => void = () => {};

    let progress = 0;
    let step = "Booting the container..."
    setInterval(() => {
        progress += 1;
        if (progress > 100) {
            progress = 0;
        }
    }, 10);

    // ask the server to spin up the docker container yay
    fetch('/api/games/launch/ttr', {
        method: 'POST'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Server response:', data);

        setInterval(() => {
            fetch(`/api/games/progress/${data.containerId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    step = data.status;

                    if (data.status === "It's go time!" || data.status === "Prompting user for credentials...") {
                        // game is ready or interaction is needed, show the player
                        setTimeout(() => {
                            showPlayer();
                        }, 1500);
                    }

                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }, 1000);





    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


</script>

<div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
    <p><b>Requesting ToonTown Rewritten...</b></p>
    <p><i>{step}</i></p>
    <div class="progress-indicator">
        <span class="progress-indicator-bar" style="width: {progress}%"></span>
    </div>
</div>
