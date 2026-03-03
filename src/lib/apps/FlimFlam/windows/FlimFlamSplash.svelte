<script>
    import FlimFlamLogo from "$lib/assets/start.png"; // placeholder
    import { showBasicAlert } from "$lib/utils/dialogHelper";
    let progress = $state(0);
    let status = $state("Loading...");
    // const loadBar = setInterval(() => {
    //     progress += Math.random() * 4; // increase progress by a random amount between 0 and 10
    //     if (progress >= 100) {
    //         clearInterval(loadBar);
    //         progress = 100;
    //     }
    // }, 100); // update progress every 500ms

    const splashQuips = [
        "Come on and slam, and welcome to FlimFlam!",
        "I GOTTA GET THE BREAD AND MILK!",
        "Totally not inspired by AIM!",
        "Perrywinkle Purple",
        "Welcome to the Glenn Quagmire",
        "I'm sleepy",
        "I'm hungry",
        "Welcome to sillyzone: COME SEE THE I.M.",
        "i wish caliborn were real",
        "i wish gamzee were real",
        "i wish vriska were real",
        "WHERE BEAR",
        "what ahpoopend i wa son flimflam",
        "lotter taste breader than bread",
        "SNOP!! DNOP!! SHUP IT DOUND OPNEN OUP SHLOP!",
        "Also try Joust!",
        "abc for seventeen star sellbot field office",
        "that was completely optional to say",
    ];

    // first lets check that flimflam is available on the server
    fetch("/api/status").then((res) => res.json()).then((data) => {
        if (data.services.applications.flimflam === "running") {
            status = "Logging in...";
            // then we can start the loading process
            const loadBar = setInterval(() => {
                progress += Math.random() * 4; // increase progress by a random amount between 0 and 10
                if (progress >= 100) {
                    clearInterval(loadBar);
                    progress = 100;
                }
            }, 100); // update progress every 500ms
        } else {
            status = "Oops!";
            showBasicAlert("This is getting scary...", "FlimFlam's servers are currently unavailable. Try again later.", ["OK"]);
        }
    }).catch(() => {
        status = "Oops!";
        showBasicAlert("This is getting scary...", "Couldn't check the status of FlimFlam's servers. Is your internet working?", ["OK"]);
    });

</script>

<div
    style="width: 100%; height: 100%; display: flex; flex-direction: row; gap: 16px"
>
    <!-- photo emblem -->
    <div class="flimflam-logo">
        <img
            src={FlimFlamLogo}
            alt="FlimFlam Logo"
            style="width: 80%; height: 80%; object-fit: contain;"
        />
    </div>

    <div
        style="display: flex; flex-direction: column; height: 100%; width: 100%; justify-content: space-between;"
    >
        <div style="display: flex; flex-direction: row">
            <p style="font-size: 34px">FlimFlam</p>

            <div style="flex-grow: 1"></div>

            <p class="splash-quip">
                "{splashQuips[Math.floor(Math.random() * splashQuips.length)]}"
            </p>
        </div>

        <div>
            <p>{status}</p>
            <div class="progress-indicator">
                <span class="progress-indicator-bar" style="width: {progress}%"
                ></span>
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
