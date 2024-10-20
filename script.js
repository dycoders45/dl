function a(b) { return btoa(b); }
function c(d) { return atob(d); }
function downloadVideo() {
    const e = document.getElementById('url-input').value;
    if (!e) {
        f('Please enter a TikTok URL');
        return;
    }
    const g = document.getElementById('loading-modal');
    g.style.display = 'flex';
    const h = c('aHR0cHM6Ly9hcGkudGlrbHlkb3duLmV1Lm9yZy9hcGkvZG93bmxvYWQvdjM/dXJsPQ==') + encodeURIComponent(e);
    fetch(h) 
        .then(i => i.json())
        .then(j => {
            if (j.status === 200) {
                const k = j.result.video; 
                const l = j.result.music;
                const m = j.result.author.avatar; 
                const n = j.result.author.nickname;
                const o = j.result.desc; 
                const p = j.result.statistics.likeCount;
                const q = j.result.statistics.commentCount; 
                const r = j.result.statistics.shareCount; 

                const s = document.getElementById('result-container');
                s.innerHTML = `
                    <div class="card">
                        <img class="avatar" src="${m}" alt="Avatar">
                        <p><strong>${n}</strong></p>
                        <p>${o}</p>
                        <p>Likes: ${p}, Comments: ${q}, Shares: ${r}</p>
                    </div>
                `;

                const t = document.getElementById('download-video');
                const u = document.getElementById('download-music');
                t.href = k;
                u.href = l; 

              
                document.getElementById('download-links').style.display = 'block';
                t.style.display = 'inline-block';
                u.style.display = 'inline-block';
            } else {
                f('Failed to retrieve video. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            f('Failed get data');
        })
        .finally(() => {
            g.style.display = 'none';
        });
}
function f(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
