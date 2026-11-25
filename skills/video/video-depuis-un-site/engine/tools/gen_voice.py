"""Generate one French voice-over take per script line with Microsoft's neural voices (edge-tts, no API key).
usage: PIECE=pieces/<name> python gen_voice.py [voice] [rate] [pitch] [id1,id2]  (ids = regenerate only these lines)
rate/pitch can be set per line in voice/script.json ("rate": "-30%")."""
import asyncio, json, os, sys
import edge_tts

HERE = os.path.abspath(os.environ.get('PIECE', '.'))   # the piece directory (pieces/<name>)
VOICE = sys.argv[1] if len(sys.argv) > 1 else 'fr-FR-VivienneMultilingualNeural'
RATE = sys.argv[2] if len(sys.argv) > 2 else '-8%'
PITCH = sys.argv[3] if len(sys.argv) > 3 else '-2Hz'

async def main():
    script = json.load(open(os.path.join(HERE, 'voice', 'script.json'), encoding='utf8'))
    only = set(sys.argv[4].split(',')) if len(sys.argv) > 4 else None   # regenerate just these line ids
    for L in script['lines']:
        if only and L['id'] not in only:
            continue
        out = os.path.join(HERE, 'voice', L['file'])
        await edge_tts.Communicate(L['text'], VOICE, rate=L.get('rate', RATE), pitch=PITCH).save(out)
        print('ok', L['id'], os.path.getsize(out))

asyncio.run(main())
