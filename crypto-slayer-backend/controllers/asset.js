import schemas from '../models';

const AssetSchema = schemas.assetSchema;

export function addAsset(req, res) {
  const { name, amount } = req.body;
  if (name == null || amount == null) {
    return res.status(422).send({ error: 'Please provide name and amount' });
  }
  const newAsset = new AssetSchema({
    owner: req.user._id,
    name,
    amount
  });
  newAsset.save(err => {
    if (err) {
      return res
        .status(500)
        .send({ error: 'Backend error! Could not save new asset' });
    }
    return res.status(200).send({ id: newAsset._id });
  });
}

export function removeAsset(req, res) {
  const { assetId } = req.body;
  if (assetId == null) {
    return res.status(422).send({ error: 'Please provide asset id' });
  }
  AssetSchema.deleteOne({ owner: req.user._id, _id: assetId }, err => {
    if (err) {
      return res
        .status(500)
        .send({ error: 'Backend error! Could not delete the asset' });
    }
    return res.status(200).send();
  });
}

export function editAsset(req, res) {
  const { assetId, name, amount } = req.body;
  if (assetId == null || name == null || amount == null) {
    return res
      .status(422)
      .send({ error: 'Please provide asset id, name and amount' });
  }
  AssetSchema.updateOne(
    { owner: req.user._id, _id: assetId },
    { name, amount },
    err => {
      if (err) {
        return res
          .status(500)
          .send({ error: 'Backend error! Could not edit the asset' });
      }
      return res.status(200).send();
    }
  );
}

export function getAssets(req, res) {
  const { page = 1 } = req.params;
  AssetSchema.paginate(
    { owner: req.user._id },
    { page, limit: 5 },
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ error: 'Backend error! Could not fetch the assets' });
      }
      return res.status(200).send({ results });
    }
  );
}
