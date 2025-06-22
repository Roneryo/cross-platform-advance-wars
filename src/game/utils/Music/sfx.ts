export function preloadMusic(scene: Phaser.Scene): void {
  scene.load.audio("cursor_sfx", "game/assets/sounds/sfx/cursor.wav");
  // Precargar música de fondo
  scene.load.audio(
    "background_music",
    "game/assets/sounds/music/background.mp3"
  );
  scene.load.audio("menu_music", "game/assets/sounds/music/menu.mp3");
}

export function playSFX(
  scene: Phaser.Scene,
  soundKey: string,
  config?: Phaser.Types.Sound.SoundConfig
): void {
  scene.sound.play(soundKey, config);
}

export function playSFXWithVolume(
  scene: Phaser.Scene,
  soundKey: string,
  volume: number = 1
): void {
  scene.sound.play(soundKey, { volume });
}

export function playMusic(
  scene: Phaser.Scene,
  musicKey: string,
  config?: Phaser.Types.Sound.SoundConfig
): void {
  scene.sound.play(musicKey, {
    loop: true,
    volume: 0.3,
    ...config,
  });
}

export function stopSFX(scene: Phaser.Scene, soundKey: string): void {
  scene.sound.stopByKey(soundKey);
}

export function stopAllSFX(scene: Phaser.Scene): void {
  scene.sound.stopAll();
}

export function stopMusic(scene: Phaser.Scene, musicKey: string): void {
  scene.sound.stopByKey(musicKey);
}

export function setGlobalVolume(scene: Phaser.Scene, volume: number): void {
  scene.sound.setVolume(volume);
}

export function muteAll(scene: Phaser.Scene): void {
  scene.sound.setMute(true);
}

export function unmuteAll(scene: Phaser.Scene): void {
  scene.sound.setMute(false);
}
