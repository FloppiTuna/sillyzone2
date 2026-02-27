<script>
    import FlimFlamLogo from '$lib/assets/start.png'; // placeholder
    let progress = $state(0);

    const loadBar = setInterval(() => {
        progress += Math.random() * 4; // increase progress by a random amount between 0 and 10
        if (progress >= 100) {
            clearInterval(loadBar);
            progress = 100;
        }
    }, 100); // update progress every 500ms

    const splashQuips = [
        "Come on and slam, and welcome to FlimFlam!",
        "I GOTTA GET THE BREAD AND MILK!",
        "Totally not inspired by AIM!",
        "Perrywinkle Purple",
        "Welcome to the Glenn Quagmire",
        "I'm sleepy",
        "I'm hungry",
        "Welcome to sillyzone: COME SEE THE I.M."
    ]




</script>

<div style="width: 100%; height: 100%; display: flex; flex-direction: row; gap: 16px">
    <!-- photo emblem -->
    <div class="flimflam-logo">
        <img src={FlimFlamLogo} alt="FlimFlam Logo" style="width: 80%; height: 80%; object-fit: contain;">
    </div>

    <div style="display: flex; flex-direction: column; height: 100%; width: 100%; justify-content: space-between;">

        <div style="display: flex; flex-direction: row">
            <p style="font-size: 34px">FlimFlam</p>

            <div style="flex-grow: 1"></div>

            <p class="splash-quip">"{splashQuips[Math.floor(Math.random() * splashQuips.length)]}"</p>

        </div>

        <div>
            <p>Loading...</p>
            <div class="progress-indicator">
                <span class="progress-indicator-bar"  style="width: {progress}%"></span>
            </div>
        </div>
    </div>
</div>


<style>
    .splash-quip {
        font-style: italic;
    }

    .flimflam-logo {
        display: flex;
        aspect-ratio: 1 / 1;
        height: 100%;
        background: #008080;
        justify-content: center;
        align-items: center;
        font-size: 48px;
        font-style: oblique;
    }
</style>