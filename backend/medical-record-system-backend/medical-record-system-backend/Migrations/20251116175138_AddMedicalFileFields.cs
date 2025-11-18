using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace medical_record_system_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicalFileFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "FileType",
                table: "MedicalFiles");

            migrationBuilder.RenameColumn(
                name: "StoredFileName",
                table: "MedicalFiles",
                newName: "FilePath");

            migrationBuilder.RenameColumn(
                name: "OriginalFileName",
                table: "MedicalFiles",
                newName: "FileName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "MedicalFiles",
                newName: "StoredFileName");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "MedicalFiles",
                newName: "OriginalFileName");

            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
