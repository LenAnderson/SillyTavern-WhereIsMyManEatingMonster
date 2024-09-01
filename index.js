import { chat, event_types, eventSource, getRequestHeaders } from '../../../../script.js';
import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { delay, uuidv4 } from '../../../utils.js';


let isWaiting = false;
let isLooping = true;
let loopId;
const waitLoop = async(force = false)=>{
    if (!force && isLooping) return;
    const myLoopid = uuidv4();
    loopId = myLoopid;
    while (true) {
        if (myLoopid != loopId) return;
        if (isWaiting) {
            try {
                const fn = uuidv4();
                const dlResponse = await fetch('/api/assets/download', {
                    method: 'POST',
                    headers: getRequestHeaders(),
                    body: JSON.stringify({
                        url: 'https://scylla.scylla.wtf/status',
                        filename: fn,
                        category: 'ambient',
                    }),
                });
                if (!dlResponse.ok) throw new Error('/fetch - failed to fetch');
                const contentResponse = await fetch(`/assets/ambient/${fn}`);
                if (!contentResponse.ok) throw new Error('/fetch - failed to fetch');
                const data = await contentResponse.json();
                fetch('/api/assets/delete', {
                    method: 'POST',
                    headers: getRequestHeaders(),
                    body: JSON.stringify({
                        filename: fn,
                        category: 'ambient',
                    }),
                });
                if (data.claude?.activeKeys ?? 0) {
                    isWaiting = false;
                    toastr.success('Found the man eating monster!', 'Sylla is back!', { timeOut:0 });
                    Notification.requestPermission().then(()=>{
                        new Notification('Scylla is back!');
                    });
                    // const sfxResponse = await fetch('/scripts/extensions/third-party/SillyTavern-WhereIsMyManEatingMonster/sfx/back.ogg', { headers: { responseType: 'arraybuffer' } });
                    // if (!sfxResponse.ok) {
                    //     // no sound for you...
                    //     continue;
                    // }
                    // const con = new AudioContext();
                    // const src = con.createBufferSource();
                    // src.buffer = await con.decodeAudioData(await sfxResponse.arrayBuffer());
                    // const volume = con.createGain();
                    // volume.gain.value = 1;
                    // volume.connect(con.destination);
                    // src.connect(volume);
                    // src.start();
                } else {
                    toastr.info('I can\'t find the man eating monster...', null, { timeOut: 1000 * 1 });
                }
            } catch {
                toastr.warning('I don\'t even know where to look for a man eating monster...', null, { timeOut: 1000 * 1 });
            }
        }
        await delay(1000 * 60);
    }
};
const init = async()=>{
    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, ()=>{
        if (/proxy.+error/i.test(chat.at(-1).mes)) {
            isWaiting = true;
            waitLoop(true);
        }
    });
};
init();


SlashCommandParser.addCommandObject(SlashCommand.fromProps({ name: 'lookforthemonster',
    callback: (args, value)=>{
        isWaiting = true;
        waitLoop(true);
        return '';
    },
    helpString: 'Try to find the man eating monster.',
}));
