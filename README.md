# JsDiffer
A JavaScript Diff Utility

## Demo
Check out the demo <a href="https://ssl.jackzh.com/demo/js-differ/test.html">here</a>.

## API Reference
#### JsDiffer.setX(array) -> void
Set source data
#### JsDiffer.setY(array) -> void
Set destination data
#### JsDiffer.lcs() -> array
Calculate longest common subsequence between X and Y
#### JsDiffer.diff() -> array
Calculate diff between X and Y, see example for more details.
```javascript
diff.setX([
    "class SkinnedMesh extends THREE.Mesh {",
    "super(geometry, materials);",
    "this.idMatrix = SkinnedMesh.defaultMatrix();",
    "this.bones = [];",
    "this.boneMatrices = [];"
]);
diff.setY([
    "class SkinnedMesh extends THREE.Mesh {",
    "constructor(geometry, materials) {",
    "super(geometry, materials);",
    "idMatrix = SkinnedMesh.defaultMatrix();",
    "this.bones = [];",
    "this.boneMatrices = [];"
]);
```
Will result in something like this
```
[0,0] # class SkinnedMesh extends THREE.Mesh {
[0,1] + constructor(geometry, materials) {
[1,2] # super(geometry, materials);
[2,2] - this.idMatrix = SkinnedMesh.defaultMatrix();
[2,3] + idMatrix = SkinnedMesh.defaultMatrix();
[3,4] # this.bones = [];
[4,5] # this.boneMatrices = [];
```
