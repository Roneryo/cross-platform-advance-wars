const units: any = {
  leftRun: {
    animationName: "animatedUnits",
    start: 0,
    end: 2,
    framerate: 10,
    frameWidth: 16,
    frameHeight: 16,
  },
  rightRun: {
    animationName: "animatedUnits",
    start: 3,
    end: 5,
    framerate: 10,
    frameWidth: 16,
    frameHeight: 16,
  },
  idle: {
    animationName: "IdleRed",
    start: 0,
    end: 2,
    framerate: 4,
    frameWidth: 16,
    frameHeight: 16,
  },
};
export function createSpriteAnimations(
  scene: Phaser.Scene,
  unitName: string
): void {
  if (!units[unitName]) {
    console.error(`Unit ${unitName} not found`);
    return;
  }
  const unit = units[unitName];

  scene.anims.create({
    key: unitName,
    frameRate: unit.framerate,
    frames: scene.anims.generateFrameNumbers(unit.animationName, {
      start: unit.start,
      end: unit.end,
    }),
    repeat: -1,
  });
}

// export function createSpriteAnimations(scene: Phaser.Scene): void {
//     scene.anims.create({
//       key: "leftRun",
//       frameRate: 10,
//       frames: scene.anims.generateFrameNumbers("animatedUnits", {
//         start: 0,
//         end: 2,
//       }),
//       repeat: -1,
//     });
//     scene.anims.create({
//       key: "rightRun",
//       frameRate: 10,
//       frames: scene.anims.generateFrameNumbers("animatedUnits", {
//         start: 3,
//         end: 5,
//       }),
//       repeat: -1,
//     });
//     scene.anims.create({
//       key: "idle",
//       frameRate: 4,
//       frames: scene.anims.generateFrameNumbers("IdleRed", {
//         start: 0,
//         end: 2,
//       }),
//       repeat: -1,
//     });
//   }
