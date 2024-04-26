const { Digimon } = require("../models");
const { Op } = require("sequelize");

class PublicController {
  static async getAllDigimon(req, res, next) {
    try {
      const { color, sort, search, page, types } = req.query;
      let paramsQuerySQL = { attribute: ["id", "imgUrl", "cardName"] };
      let limit = 20;
      let pageNumber = 1;
      let coloumnName = "createdAt";
      let ordering = "DESC";

      //  Filtering and search
      if (color !== undefined && search !== undefined && types !== undefined) {
        paramsQuerySQL.where = {
          [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }, { color1: color }, { type: types }],
        };
      } else if (color !== undefined && search !== undefined) {
        paramsQuerySQL.where = {
          [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }, { color1: color }],
        };
      } else if (color !== undefined && types !== undefined) {
        paramsQuerySQL.where = {
          [Op.and]: [{ color1: color }, { type: types }],
        };
      } else if (search !== undefined && types !== undefined) {
        paramsQuerySQL.where = {
          [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }, { type: types }],
        };
      } else if (color !== undefined) {
        paramsQuerySQL.where = { color1: color };
      } else if (search !== undefined) {
        paramsQuerySQL.where = { name: { [Op.iLike]: `%${search}%` } };
      } else if (types !== undefined) {
        paramsQuerySQL.where = { type: types };
      }

      //   Pagination
      if (page) {
        if (page.size) {
          limit = +page.size;
          paramsQuerySQL.limit = limit;
        }
        if (page.number) {
          pageNumber = +page.number;
          paramsQuerySQL.offset = limit * (pageNumber - 1);
        }
      }

      //   Sorting
      if (sort) {
        // Default colom sorting soal saat ini
        ordering = sort[0] === "-" ? "DESC" : "ASC";
        // let order = ordering === "DESC" ? sort.slice(1) : sort;
        // jika nanti dibutuhkan orderisasi berbeda
        // if (order && order != "createdAt") {
        //   coloumnName = order;
        // }
        paramsQuerySQL.order = [[coloumnName, ordering]];
      } else {
        paramsQuerySQL.order = [[coloumnName, ordering]];
      }

      console.log(paramsQuerySQL, "ini SQL");

      const { count, rows } = await Digimon.findAndCountAll(paramsQuerySQL);
      console.log(count);
      // jika dibutuhkan menampilkan seluruh data di Front End nanti dari pada ubah ubah coding
      // if (!filter && !sort && !search && !page) {
      //   limit = count;
      // }

      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getDigimonById(req, res, next) {
    try {
      const input = req.params.id;
      const data = await Digimon.findByPk(input);
      if (!data) {
        throw { name: "NotFound" };
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
